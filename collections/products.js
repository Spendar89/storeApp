Products = new Meteor.Collection("products");

_.extend(Products, {
  getNewProduct: function (pg) {
    var productGroup = pg || Session.get("productGroup");
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
  },

  getOptionKeys: function (product) {
    return _.map(product.options, function (values, key) {
      return key;
    });
  },

  getImageUrls: function (product) {
    var images = ProductImages.find({_id: {$in: product.imageIds}}).fetch();
    return ProductImages.getUrls(images);
  }
});

Helpers.addPermissions(Products);

Product = function (doc) {
  this.data = doc;
};

Product.prototype = {
  save: function () {
    return Meteor.call("productsUpsert", this.data)
  }
};