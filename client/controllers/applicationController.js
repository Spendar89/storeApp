ApplicationController = RouteController.extend({
  waitOn: function () {
    console.log("waiting on defaults");
    return this.subscribe("storeDefaults", "q2dMF25K4Jb3Q3j7Y");
  },

  setStoreSession: function () {
    Session.set('store', Stores.findOne());
  },

  setUserSession: function () {
    var user = Meteor.user();
    Session.set("currentUser", user);
    Session.set("currentUserId", Meteor.userId());
  },

  setDefaultSessions: function () {
    this.setUserSession();
    this.setStoreSession();
  },

  setFriendCart: function () {
    var friendId = Session.get("friendId");
    if (friendId) {
      Meteor.call("addFriend", Meteor.user(), friendId);
      console.log("getting friend's cart");
      this.subscribe("friend_cart", friendId);
    }
  },

  setCartSession: function () {
    this.setFriendCart();
    var cart = Carts.findOne({userId: Meteor.userId()});
    var newCart =  Carts.build(Meteor.userId());
    if (cart) {
      Session.set("newCart", newCart);
      Session.set("cartId", cart._id);
    } else {
      Meteor.call("cartsUpsert", newCart);
    }
  },

  onBeforeAction: function () {
    if(this.ready()) {
      console.log("hey im ready");
      this.setDefaultSessions();
      this.setCartSession();
    } else {
      console.log("hey im not ready");
    }

  }
});