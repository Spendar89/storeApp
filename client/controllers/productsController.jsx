/**
 * @jsx React.DOM
 */



AdminProductsIndexController = ApplicationController.extend({
  layoutTemplate: 'default_layout',

  onBeforeAction: function () {
    var data = this.data();

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

  onAfterAction: function () {
    var that = this;
    this.defaultTemplate().rendered = function () {
      this.renderCart();
      React.renderComponent(ProductsBlock({key: this.params._id}),
                            document.getElementById('productGroupBlock'));
      React.renderComponent(ProductForm({}),
                            document.getElementById('productForm'));

      $('#cartBlock').affix({
        offset: {
          top: $('#navbar').height()
        }
      });

    }.bind(this);
  }
});

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

ProductsIndexController = ApplicationController.extend({
  layoutTemplate: 'default_layout',

  onAfterAction: function () {
    this.defaultTemplate().rendered = function () {
      this.renderCart();
      var domNode = document.getElementById('productsIndexBlock');
      React.renderComponent(ProductsIndexBlock({}), domNode);
    }.bind(this);
  }
});