ApplicationController = RouteController.extend({
  defaultTemplate: function () {
    var templateName = this.lookupTemplate();
    return Template[templateName];
  },

  waitOn: function () {
    return this.subscribe("storeDefaults", "q2dMF25K4Jb3Q3j7Y");
  },

  setStoreSession: function () {
    Session.set('store', Stores.findOne());
  },

  setUserSession: function () {
    currentUser = new User(Meteor.user());
    Session.set("currentUser", Meteor.user());
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

  setDefaultCartSession: function () {
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

  setCartSession: function (cartId) {
    if (cartId) {
      console.log("setting cartId from params");
      Session.set("cartId", cartId);
    } else {
      console.log("setting cartId from default shat");
      this.setDefaultCartSession();
    }
  },

  renderCart: function () {
    var btnNode = document.getElementById('showCartBtn');
    var cartNode = document.getElementById('cartBlock');
    React.renderComponent(ShowCartBtn({}), btnNode);
    React.renderComponent(CartManager({}), cartNode);

  },

  onBeforeAction: function () {
    if (this.ready()) {
      this.setDefaultSessions();
      this.setCartSession(this.params.cart_id);
    }
  },

  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});