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