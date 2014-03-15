Meteor.publish("all_product_groups", function () {
  return ProductGroups.find();
});

Meteor.publish("all_product_property_rules", function () {
  return ProductPropertyRules.find();
});

Meteor.publish("current_store_product_groups", function (storeId) {
  return ProductGroups.find({
    storeId: storeId
  });
});

Meteor.publish("current_stores", function (storeId) {
  return Stores.find({
    _id: storeId
  });
});

Meteor.publish("all_stores", function () {
  return Stores.find();
});

Meteor.publish("all_products", function () {
  return Products.find();
});

Meteor.publish("productGroupProducts", function (id) {
  var products;
  var newProduct;

  if (id) {
    // newProduct = Products.findOne({
    //   isNew: true
    // });
    // if (!newProduct) Meteor.call("insertNewProduct", id);
    products = Products.find({
      productGroupId: id
    });
  }
  return products;

});

Meteor.publish("all_product_images", function () {
  return ProductImages.find();
  // if (this.userId) {
  //   return ContactsFS.find({ owner: this.userId }, { limit: 30 });
  //  }
});