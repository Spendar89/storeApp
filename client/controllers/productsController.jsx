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

  renderComponents: function () {
    React.renderComponent(<ProductsBlock key={this.params._id} />, document.getElementById('productGroupBlock'));
    React.renderComponent(<ProductForm/>, document.getElementById('productForm'));
  },

  action: function () {
    var params = this.params;
    var that = this;
    if(this.ready()) {
      this.render();
    }

    Template[this.template].rendered = this.renderComponents.bind(this);
  }

});

ProductShowController = RouteController.extend({
  layoutTemplate: 'default_layout',

  waitOn: function () {
    return Meteor.subscribe('productGroupProducts', this.params.product_group_id);
  },

  before: function () {
    var data = this.getData();
    if(data && data.product) {
      Session.set("product", data.product);
      Session.set("productGroup", data.productGroup);
    }
  },

  data: function () {
    var productGroup = ProductGroups.findOne(this.params.product_group_id);
    var product = Products.findOne(this.params._id);
    if (productGroup && product) {
      return {
        productGroup: productGroup,
        product: product
      }
    }
  },

  renderComponents: function () {
    React.renderComponent(<ProductImagesBlock/>, document.getElementById('productImagesBlock'));
    React.renderComponent(<ProductDetailBlock/>, document.getElementById('productDetailBlock'));
  },

  action: function () {
    var params = this.params;
    var that = this;
    if(this.ready()) {
      this.render();
    }

    Template[this.template].rendered = this.renderComponents.bind(this);
  }
});