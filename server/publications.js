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
  if (id) {
    products = Products.find({
      productGroupId: id
    });
  }
  return products;
});

Meteor.publish("store_products", function (storeId) {
  if (storeId) {
    var productGroupIds = ProductGroups.find({storeId: storeId}).map(function (pg) {return pg._id});
    return Products.find({productGroupId: {$in: productGroupIds}});
  }
});

Meteor.publish("all_product_images", function () {
  return ProductImages.find();
});

Meteor.publish("friends", function (friendIds) {
  if (this.userId) {
    return Users.find({_id: {$in: friendIds.concat([this.userId])}})
  }
});

Meteor.publish("user_cart", function () {
  if (this.userId) {
    return Carts.find({userId: this.userId});
  }
});

Meteor.publish("friend_cart", function (friendId) {
  if (this.userId && friendId) {
    return Carts.find({userId: {$in: [friendId, this.userId]}});
  }
});

Meteor.publish("storeDefaults", function (storeId) {
  var stores = Stores.find({ _id: storeId });
  var productGroups = ProductGroups.find({ storeId: storeId });
  var productImages = ProductImages.find();
  var userCart = Carts.find({userId: this.userId});
  return [stores, productGroups, productImages, userCart];
});