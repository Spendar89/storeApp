/**
 * @jsx React.DOM
 */

CheckoutController = ApplicationController.extend({
  layoutTemplate: 'default_layout',

  onBeforeAction: function () {

    Session.set("cartIsOpen", false);

    var stripeCustomer = Meteor.user() && Meteor.user().stripeCustomer;
    Session.set("stripeCustomer", stripeCustomer);
    // if (stripeCustomer) {
    //   Session.set("stripeCustomer", stripeCustomer);
      // Meteor.call("stripeCustomersRetrieve", stripeCustomerId, function (err, res) {
      //   Session.set("stripeCustomer", res);
      // });
    // } else {
    //   Session.set("stripeCustomer", null);
    // }
  },

  data: function () {
  },

  onAfterAction: function () {
    this.defaultTemplate().rendered = function () {
      this.renderCart();
      React.renderComponent(CheckoutBlock({}),
                            document.getElementById('checkoutBlock'));
    }.bind(this);
  }

});