Router.map(function () {

  // provide a String to evaluate later
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

});