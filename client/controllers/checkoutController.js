/**
 * @jsx React.DOM
 */

CheckoutController = ApplicationController.extend({
  layoutTemplate: 'default_layout',

  onBeforeAction: function () {
    Session.set("cartIsOpen", false);
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