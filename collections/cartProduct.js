CartProducts = new Meteor.Collection("cartProducts");

_.extend(CartProducts, {
  build: function (product) {
    var productId = product && product._id;
    return {
      productId: productId,
      options: {},
      subtotal: 0
    };
  }
});

Helpers.addPermissions(Carts);