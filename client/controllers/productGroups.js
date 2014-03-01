ProductGroupsController = RouteController.extend({
  // layoutTemplate: 'default_layout',
  yieldTemplates: {
    'footer': {
      to: 'footer'
    }
  }

  // before: function () {},

  // after: function () {},

  // waitOn: function () {
  //   return Meteor.subscribe('productGroups');
  // }

  // data: function () {
  //   return {
  //     productGroups: ProductGroups.findOne({})
  //   };
  // }

  // action: function () {
  //   /* if we want to override default behavior */
  // }
});

ProductGroupsIndexController = ProductGroupsController.extend({
  template: "product_groups_index"
});

ProductGroupsShowController = ProductGroupsController.extend({
  template: "product_group_show",
  data: function () {
    return {
      productGroup: ProductGroups.findOne({
        _id: this.params._id
      })
    };
  }
});