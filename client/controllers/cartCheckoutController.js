CartCheckoutController = ApplicationController.extend({
  layoutTemplate: 'default_layout',

  onBeforeAction: function () {
    Session.set("cartIsOpen", false);
    this.setStripeCustomer();
    // this.redirectIfInactive();
  },

  redirectIfInactive: function () {
    var cart = Session.get("cart");
    if (cart && !cart.active) {
      this.redirect('cartConfirmation', { cart_id: cart._id });
    }
  },

  setStripeCustomer: function () {
    var stripeCustomer = Meteor.user() && Meteor.user().stripeCustomer;
    Session.set("stripeCustomer", stripeCustomer);
  },

  onAfterAction: function () {
    this.defaultTemplate().rendered = function () {
      this.renderCart();
      React.renderComponent(CartCheckoutBlock({}),
                            document.getElementById('cartCheckoutBlock'));
    }.bind(this);
  }

});