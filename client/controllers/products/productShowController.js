ProductShowController = ApplicationController.extend({
  layoutTemplate: 'default_layout',

  onBeforeAction: function () {
    var data = this.data();
    if (data && data.product) {
      Session.set("cartProduct", data.cartProduct);
      Session.set("product", data.product);
      Session.set("productGroup", data.productGroup);
    }
  },

  data: function () {
    var product = Products.findOne(this.params._id);
    var productGroup = product && ProductGroups.findOne(product.productGroupId);
    if (productGroup && product) {
      return {
        cartProduct: CartProducts.build(product),
        productGroup: productGroup,
        product: product
      };
    }
  },

  onAfterAction: function () {
    var that = this;

    this.defaultTemplate().rendered = function () {
      this.renderCart();
      React.renderComponent(ProductImagesBlock({}),
                            document.getElementById('productImagesBlock'));

      React.renderComponent(ProductDetailBlock({}),
                            document.getElementById('productDetailBlock'));
    }.bind(this);
  }
});