Meteor.methods({
  insertProductGroup: function (params) {
    if (this.userId && params) {
      ProductGroups.insert(params);
    }
  },

  updateProductGroup: function (productGroupId, params) {
    ProductGroups.update({
      _id: productGroupId
    }, params);
  },

  insertProduct: function (product) {
    Products.insert(product);
    return Products.findOne(product);
  },

  insertAndReturn: function (Collection, params) {
    var id = Collection.insert(params);
    return Collection.findOne(id);
  },

  productsUpsert: function (product, callback) {
    return Products.upsert({_id: product._id}, product);
  },

  productGroupsUpsert: function (productGroup, callback) {
    return ProductGroups.upsert({_id: productGroup._id}, productGroup);
  },

  productGroupsRemove: function (productGroupId) {
    return ProductGroups.remove(productGroupId);
  },

  productsRemove: function (productId) {
    return Products.remove(productId);
  }
});