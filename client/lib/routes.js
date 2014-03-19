Router.map(function () {
  this.route('productGroupsIndex', {
    path: 'product_groups',
    controller: 'ProductGroupsIndexController',
    layoutTemplate: 'default_layout'
  });

  this.route('productGroupShow', {
    path: 'product_groups/:_id',
    controller: 'ProductGroupsShowController'
  });

  this.route('productsIndex', {
    path: 'product_groups/:_id/products',
    controller: 'ProductsIndexController'
  });

  this.route('productShow', {
    path: 'product_groups/:product_group_id/products/:_id',
    controller: 'ProductShowController'
  });
});