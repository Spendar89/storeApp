ProductGroupsController = RouteController.extend({
  // layoutTemplate: 'default_layout',
  yieldTemplates: {
    'footer': {
      to: 'footer'
    }
  },

  waitOn: function () {
    currentProductGroup = _.extend(new LiveDoc(null), {
      getProductPropertyRules: function () {
        var array = _.toArray(this.get().productPropertyRules);
        return array || [];
      }
    });

    currentStore = new LiveDoc(Stores.findOne());
  },

  // after: function () {},

  data: function () {
    return {
      currentProductGroup: function () {
        return currentProductGroup.get();
      }
    };
  }

  // action: function () {
  //   /* if we want to override default behavior */
  // }
});

ProductGroupsIndexController = ProductGroupsController.extend({
  template: "productGroupsIndex"
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