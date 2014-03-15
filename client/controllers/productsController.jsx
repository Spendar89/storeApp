/**
 * @jsx React.DOM
 */

ProductsIndexController = RouteController.extend({
  layoutTemplate: 'default_layout',

  waitOn: function () {
    return Meteor.subscribe('productGroupProducts', this.params._id);
  },

  before: function () {
    var data = this.getData();
     if(data && data.newProduct) {
    Session.set("newProduct", data.newProduct);
    Session.set("productGroup", data.productGroup);
    }
  },

  data: function () {
    var productGroup = ProductGroups.findOne(this.params._id);
    if (productGroup) {
      return {
        productGroup: productGroup,
        newProduct: getNewProduct(productGroup)
      }
    }
  },

  action: function () {
    var params = this.params;
    var that = this;
    if(this.ready()) {
      this.render();
    }

    Template[this.template].rendered = function () {
      React.renderComponent(<ProductsBlock key={params._id} />, document.getElementById('productGroupBlock'));
      React.renderComponent(<ProductForm/>, document.getElementById('productForm'));
    }
  }

});