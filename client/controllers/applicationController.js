ApplicationController = RouteController.extend({
  waitOnDefaults: function () {
    return [this.subscribe('current_stores', 'q2dMF25K4Jb3Q3j7Y').wait(),
      this.subscribe('current_store_product_groups', 'q2dMF25K4Jb3Q3j7Y').wait(),
      this.subscribe('all_product_images').wait(), this.subscribe("user_cart").wait()];
  },

  setCartSession: function () {
    var data = this.cartData();
    Session.set("newCart", data.newCart);
    Session.set("cartId", data.cartId);
  },

  setStoreSession: function () {
    Session.set('store', Stores.findOne());
  },

  setUserSession: function () {
    var user = Meteor.user();
    Session.set("currentUser", user);
    Session.set("currentUserId", user && user._id);
  },

  setDefaultSessions: function () {
    this.waitOnDefaults();
    this.setUserSession();
    this.setStoreSession();
  },

  cartData: function () {
    var currentUserId = Session.get("currentUserId");

    var cart = Carts.findOne({userId: currentUserId});
    var friendId = Session.get("friendId");
    if (friendId) {
      console.log("getting friend's cart");
      this.subscribe("friend_cart", friendId).wait();
      var friendCart = Carts.findOne({userId: friendId});
      if(friendCart) {
        Session.set("friendCartId", friendCart._id);
      }
    }
    return {
      cartId: cart && cart._id,
      newCart: Carts.build(currentUserId)
    };
  },

  before: function () {
    this.setDefaultSessions();
    this.setCartSession();
  }
});