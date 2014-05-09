ApplicationController = RouteController.extend({
  defaultTemplate: function () {
    var templateName = this.lookupTemplate();
    return Template[templateName];
  },

  waitOn: function () {
    var subscriptions = [this.subscribe('storeDefaults', 'q2dMF25K4Jb3Q3j7Y')];
    var checkoutCartId = this.params.cart_id;
    if (checkoutCartId) {
      subscriptions.push(this.subscribe('checkoutCartOrder', checkoutCartId));
    } else {
      subscriptions.push(this.subscribe('activeCartOrder'));
    }
    return subscriptions;
  },

  setStoreSession: function () {
    Session.set('store', Stores.findOne());
  },

  setUserSession: function () {
    // StoreApp.currentUser = new User(Meteor.user());
    // Session.set("currentUser", Meteor.user());
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
    var cart = Meteor.user() ? Carts.findOne() : Session.get("cart");
    if (cart) {
      Session.set("cart", cart);
    } else {
      console.log("setting new cart...");
      this.setDefaultCartSession();
    }
  },

  setDefaultCartSession: function () {
    var newCart =  Carts.build(Meteor.userId());
    if (newCart) {
      if (Meteor.user()) {
        Meteor.call("cartsUpsert", newCart);
      } else {
        Session.set("cart", newCart);
      }
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
      this.setStoreSession();
      this.setCartSession();
    }
  },

  action: function () {
    if (this.ready()) {
      this.render();
      $('body, html').removeClass('admin');
    }
  }
});