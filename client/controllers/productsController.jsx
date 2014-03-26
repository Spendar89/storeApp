/**
 * @jsx React.DOM
 */



ProductsIndexController = ApplicationController.extend({
  layoutTemplate: 'default_layout',

  waitOn: function () {
    return Meteor.subscribe('store_products', 'q2dMF25K4Jb3Q3j7Y');
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
      var newProduct = Products.getNewProduct(productGroup);
      return {
        productGroup: productGroup,
        newProduct: newProduct
      };
    }
  },

  renderComponents: function () {
    React.renderComponent(<CartBlock/>,
                          document.getElementById('cartBlock'));
    React.renderComponent(<ProductsBlock key={this.params._id} />,
                          document.getElementById('productGroupBlock'));
    React.renderComponent(<ProductForm/>,
                          document.getElementById('productForm'));
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

ProductShowController = ApplicationController.extend({
  layoutTemplate: 'default_layout',

  waitOn: function () {

    return Meteor.subscribe('store_products', 'q2dMF25K4Jb3Q3j7Y');
  },

  before: function () {
    var data = this.getData();
    if(data && data.product) {
      Session.set("cartProduct", data.cartProduct);
      Session.set("product", data.product);
      Session.set("productGroup", data.productGroup);
    }
  },

  data: function () {
    var productGroup = ProductGroups.findOne(this.params.product_group_id);
    var product = Products.findOne(this.params._id);
    if (productGroup && product) {
      return {
        cartProduct: CartProducts.build(product),
        productGroup: productGroup,
        product: product
      }
    }
  },

  renderComponents: function () {

    React.renderComponent(<CartBlock/>,
                          document.getElementById('cartBlock'));

    React.renderComponent(<ProductImagesBlock/>,
                          document.getElementById('productImagesBlock'));

    React.renderComponent(<ProductDetailBlock/>,
                          document.getElementById('productDetailBlock'));

    var $cartBlockDiv = $(".cart-block-div");
    $("#showCart").click(function (e) {
      e.preventDefault();
      $cartBlockDiv.toggleClass("open");
    });
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