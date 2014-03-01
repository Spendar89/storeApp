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

  // provide the actual controller symbol if it's already defined
  // this.route('postShow', {
  //   controller: CustomController
  // });
});