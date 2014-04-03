ProductGroups = new Meteor.Collection("productGroups");

_.extend(ProductGroups, {
  resetProductGroup: function () {
    var newProductGroup = this.getNewProductGroup(Session.get("store"));
    Session.set("editProductGroupId", null);
    Session.set("newProductGroup", newProductGroup);
  },

  uniqueCategories: function () {
    var productGroups = this.find().fetch();
    var categories = _.map(productGroups, function (p) {
      return {
        name: p.category
      };
    });
    return _.uniq(categories, function (c) {
      return c.name;
    });
  },

  getNewProductPropertyRule: function () {
    var newProductPropertyRule = {
      name: "",
      kind: "",
      allowedValues: []
    };
    return newProductPropertyRule;
  },

  getNewProductGroup: function (store) {
    if (store) {
      var newProductGroup = {
        name: "",
        category: "",
        description: "",
        storeId: store._id,
        productPropertyRules: []
      };
      newProductGroup.productPropertyRules
        .push(this.getNewProductPropertyRule());
      return newProductGroup;
    }
  }

});

Helpers.addPermissions(ProductGroups);