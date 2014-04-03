/**
 * @jsx React.DOM
 */

CartCheckoutController = ApplicationController.extend({
  layoutTemplate: 'default_layout',

  onBeforeAction: function () {
    Session.set("cartIsOpen", false);
    // var data = this.data();

    // if(data && data.newProduct) {
    //   Session.set("newProduct", data.newProduct);
    //   Session.set("productGroup", data.productGroup);

    // }
  },

  data: function () {
    // var productGroup = ProductGroups.findOne(this.params._id);
    // if (productGroup) {
    //   var newProduct = Products.getNewProduct(productGroup);
    //   return {
    //     productGroup: productGroup,
    //     newProduct: newProduct
    //   };
    // }
  },

  onAfterAction: function () {
    this.defaultTemplate().rendered = function () {
      this.renderCart();
      React.renderComponent(CartCheckoutBlock({}),
                            document.getElementById('cartCheckoutBlock'));
    }.bind(this);
  }

});