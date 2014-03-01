ProductPropertyRules = new Meteor.Collection("productPropertyRules", {
  schema: ProductPropertyRuleSchema
});

Helpers.addPermissions(ProductPropertyRules);