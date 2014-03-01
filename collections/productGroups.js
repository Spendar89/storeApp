ProductGroups = new Meteor.Collection("productGroups", {
  schema: ProductGroupSchema
});

ProductGroups.uniqueCategories = function () {
  var productGroups = this.find().fetch();
  var categories = _.map(productGroups, function (p) {
    return {
      name: p.category
    };
  });
  return _.uniq(categories, function (c) {
    return c.name;
  });
}

Helpers.addPermissions(ProductGroups);