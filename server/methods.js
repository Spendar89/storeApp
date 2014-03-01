Meteor.methods({
  insertProductGroup: function (params) {
    console.log(params);
    if (this.userId && params) {
      ProductGroups.insert(params);
    }
  },

  updateProductGroup: function (productGroupId, params) {
    ProductGroups.update({
      _id: productGroupId
    }, params);
  }
});