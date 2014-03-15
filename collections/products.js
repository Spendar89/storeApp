Products = new Meteor.Collection("products");

Helpers.addPermissions(Products);

getNewProduct = function (productGroup) {
  var productGroup = productGroup || Session.get("productGroup");
  var propertyRules = productGroup.productPropertyRules;

  var newProduct = {
    name: "",
    price: 0,
    slug: "",
    productGroupId: productGroup._id,
    properties: {}
  };

  _.each(propertyRules, function (rule, i) {
    var name = rule;
    newProduct.properties[rule.name] = {
      productPropertyRule: rule,
      name: name,
      index: i,
      value: ""
    };
  });
  return newProduct;
};