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
    StoreApp.currentUser = new User(Meteor.user());
    Session.set("currentUser", Meteor.user());
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

  setOrderSession: function () {
    console.log("Setting order!!");
    var doc = Orders.findOne({cartId: Session.get("cartId")});
    var order = new Order(doc);
    StoreApp.currentOrder = order;
    Session.set("order", order);

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
      this.setOrderSession();
    }
  },

  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});