CartConfirmationController = ApplicationController.extend({
  layoutTemplate: 'default_layout',

  onBeforeAction: function () {
    var cart = Session.get("cart");
    Session.set("cartIsOpen", false);
    this.setStripeCustomer();
    this.redirectIfActive();
  },

  redirectIfActive: function () {
    var cart = Session.get("cart");
    if (cart && cart.active) {
      this.redirect('cartCheckout', { cart_id: cart._id });
    }
  },

  setStripeCustomer: function () {
    var stripeCustomer = Meteor.user() && Meteor.user().stripeCustomer;
    Session.set("stripeCustomer", stripeCustomer);
  },

  onAfterAction: function () {
    this.defaultTemplate().rendered = function () {
      this.renderCart();
      React.renderComponent(CartConfirmationBlock({}),
                            document.getElementById('cartConfirmationBlock'));
    }.bind(this);
  }

});