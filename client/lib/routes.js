Router.map(function () {
  this.route('adminProductGroupsIndex', {
    path: 'admin/product_groups',
    controller: 'AdminProductGroupsIndexController'
  });

  this.route('productGroupShow', {
    path: 'product_groups/:_id',
    controller: 'ProductGroupsShowController'
  });

  this.route('productsIndex', {
    path: 'products',
    controller: 'ProductsIndexController'
  });

  this.route('adminProductsIndex', {
    path: 'admin/product_groups/:_id/products',
    controller: 'AdminProductsIndexController'
  });

  this.route('productShow', {
    path: 'products/:_id',
    controller: 'ProductShowController'
  });

  this.route('cartCheckout', {
    path: 'carts/:cart_id/checkout',
    controller: 'CartCheckoutController'
  });
});