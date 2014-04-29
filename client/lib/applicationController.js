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

  setOrderSession: function () {
    var order = Orders.findOne();
    var cart = Carts.findOne();
    if (order) {
      Session.set("order", order);
    } else if (cart) {
      console.log("inserting new order...");
      // make sure to change this...
      var newOrder = new Order();
      newOrder.setDefault(cart);
      newOrder.save();
    }

  },

  setPaidOrdersSession: function () {
    var paidOrders = Orders.find({
      active: false,
      userId: Meteor.userId()
    });
    Session.set("paidOrders", paidOrders.fetch());
  },

  setCartSession: function () {
    var cart = Carts.findOne();
    if (cart) {
      Session.set("cart", cart);
      Session.set("cartId", cart._id);
    } else {
      console.log("inserting new cart...");
      this.setDefaultCartSession();
    }
  },

  setDefaultCartSession: function () {
    var newCart =  Carts.build(Meteor.userId());
    if (newCart) {
      Session.set("newCart", newCart);
      Meteor.call("cartsUpsert", newCart);
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

      // means its checkout since cart_id is in
      this.setCartSession();
      this.setOrderSession();
      // this.setPaidOrdersSession();
    }
  },

  action: function () {
    if (this.ready()) {
      this.render();
    }
  }
});