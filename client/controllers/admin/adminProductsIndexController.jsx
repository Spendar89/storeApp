AdminProductsIndexController = ApplicationController.extend({
  layoutTemplate: 'admin_layout',

  onBeforeAction: function () {
    var data = this.data();
    if (data) {
      Session.set("editProduct", null);
      Session.set("newProduct", data.newProduct);
      Session.set("productGroup", data.productGroup);
    }
  },

  data: function () {
    var productGroup = ProductGroups.findOne(this.params._id);
    if (productGroup) {
      return {
        productGroup: productGroup,
        newProduct: Products.getNewProduct(productGroup)
      };
    }
  },

  onAfterAction: function () {
    this.defaultTemplate().rendered = function () {
      React.renderComponent(AdminProductsBlock({key: this.params._id}),
                            document.getElementById('adminProductsBlock'));
      React.renderComponent(AdminProductForm({}),
                            document.getElementById('adminProductForm'));
    }.bind(this);
  }
});