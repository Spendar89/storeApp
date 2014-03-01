Products = new Meteor.Collection("products", {
  schema: ProductPropertySchema
});

Helpers.addPermissions(Products);