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
    var productGroupIds = ProductGroups.find({
      storeId: storeId
    }).map(function (pg) {
      return pg._id;
    });
    return Products.find({productGroupId: {$in: productGroupIds}});
  }
});

Meteor.publish("all_product_images", function () {
  return ProductImages.find();
});

Meteor.publish("friends", function (friendIds) {
  if (this.userId) {
    return Users.find({_id: {$in: friendIds.concat([this.userId])}});
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

Meteor.publish("checkoutCartOrder", function (cartId) {
  if (cartId) {
    var cart = Carts.find({_id: cartId});
    var order = Orders.find({cartId: cartId}, {limit: 1});
    return [cart, order];
  }
});

Meteor.publish("activeCartOrder", function () {
  if (this.userId) {
    return Carts.find({userId: this.userId, active: true}, {limit: 1});
  } else {
    return [];
  }
});

Meteor.publish("storeDefaults", function (storeId) {
  var user, userCart;

  var stores = Stores.find({ _id: storeId }),
    productGroups = ProductGroups.find({ storeId: storeId }),
    productImages = ProductImages.find(),
    productGroupIds = productGroups.map(function (pg) {
      return pg._id;
    }),
    products = Products.find({productGroupId: {$in: productGroupIds}});

  if (this.userId) {
    //publishes all user fields except for createdAt and services
    user = Meteor.users.find({_id: this.userId},
                             {fields: {createdAt: 0, services: 0}});
  } else {
    user = Meteor.users.find();
  }

  return _.compact([stores, productGroups,
                    productImages, products,
                    user]);
});

Meteor.publish("adminOrders", function (storeId) {
  return Orders.find();
});

Meteor.publish("adminDefaults", function (storeId) {
  var user, userCart;

  var stores = Stores.find({ _id: storeId });
  var productImages = ProductImages.find();
  var carts = Carts.find();

  if (this.userId) {
    //publishes all user fields except for createdAt and services
    user = Meteor.users.find({_id: this.userId},
                             {fields: {createdAt: 0, services: 0}});
  }

  return _.compact([stores, productImages, user, carts]);
});



