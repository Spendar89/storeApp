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
        newProduct: Products.getNewProduct(productGroup),
        products: Products.find({productGroupId: productGroup._id}).fetch()
      };
    }
  },

  onAfterAction: function () {
    this.defaultTemplate().rendered = function () {
      $('body, html').addClass('admin');
      var product = Session.get("editProduct") || Session.get("newProduct");
      React.renderComponent(AdminProductsBlock({ key: this.params._id,
                                                 products:  this.data().products,
                                                 editProduct: Session.get("editProduct") }),
                            document.getElementById('adminProductsBlock'));

      React.renderComponent(AdminProductForm({ productGroup: this.data().productGroup }),
                            document.getElementById('adminProductForm'));
    }.bind(this);
  }
});