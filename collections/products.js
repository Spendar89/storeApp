Products = new Meteor.Collection("products");

Helpers.addPermissions(Products);

getNewProduct = function (productGroup) {
  var productGroup = productGroup || Session.get("productGroup");
  var propertyRules = productGroup.productPropertyRules;

  var newProduct = {
    name: "",
    price: 0,
    slug: "",
    headline: "",
    description: "",
    imageIds: [],
    productGroupId: productGroup._id,
    properties: {},
    options: {}
  };

  _.each(propertyRules, function (rule, i) {
    var name = rule;
    if (rule.kind === "option") {
      newProduct.options[rule.name] = [""];
    } else {
      newProduct.properties[rule.name] = {
        productPropertyRule: rule,
        name: name,
        index: i,
        value: ""
      };
    }

  });
  return newProduct;
};

Products.newOption = function (product) {
  return {
    name: "default name",
    values: ["value 1", " value 2"]
  };
};