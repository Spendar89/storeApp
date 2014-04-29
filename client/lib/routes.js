Router.map(function () {
  this.route('adminProductGroupsIndex', {
    path: 'admin/product_groups',
    controller: 'AdminProductGroupsIndexController'
  });

  this.route('adminProductsIndex', {
    path: 'admin/product_groups/:_id/products',
    controller: 'AdminProductsIndexController'
  });

  this.route('adminOrdersIndex', {
    path: 'admin/orders',
    controller: 'AdminOrdersIndexController'
  });

  this.route('productsIndex', {
    path: 'products',
    controller: 'ProductsIndexController'
  });

  this.route('productShow', {
    path: 'products/:_id',
    controller: 'ProductShowController'
  });

  this.route('cartCheckout', {
    //TODO: change path to 'checkout?cart_id=[:cart_id]'
    path: 'carts/:cart_id/checkout',
    controller: 'CartCheckoutController'
  });

  // this.route('cartConfirmation', {
  //   //TODO: change path to 'checkout?cart_id=[:cart_id]'
  //   path: 'carts/:cart_id/confirmation',
  //   controller: 'CartConfirmationController'
  // });
});