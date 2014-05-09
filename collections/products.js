Products = new Meteor.Collection("products");
Helpers.addPermissions(Products);
// TODO: Add hook before remove to determine whetehr or not any cartProducts have product
_.extend(Products, {
  getNewProduct: function (pg) {
    var productGroup = pg || Session.get("productGroup");
    var propertyRules = productGroup.productPropertyRules;

    var newProduct = {
      name: null,
      price: 0,
      slug: null,
      headline: null,
      description: null,
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
          value: null
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

if (Meteor.isServer) {
  AppDispatcher.register("products", {
    insert: function (product) {
      Products.insert(shop);
    },

    upsert: function (product) {
      return Products.upsert({_id: product._id}, product);
    },

    update: function (payload) {
      var id = payload.id;
      var updates = payload.updates;
      return Products.update({ _id: id }, { $set: updates });
    },

    remove: function (product) {
      return Products.remove(product._id);
    }
  });
}