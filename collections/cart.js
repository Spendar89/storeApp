Carts = new Meteor.Collection("carts");

_.extend(Carts, {
  build: function (userId) {
    return {
      storeId: "",
      userId: userId,
      cartProducts: [],
      subtotal: 0
    };
  }
});

Helpers.addPermissions(Carts);