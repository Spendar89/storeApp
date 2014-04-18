CartProducts = new Meteor.Collection("cartProducts");

_.extend(CartProducts, {
  build: function (product) {
    var productId = product && product._id;
    return {
      productId: productId,
      product: product,
      options: {},
      quantity: 1,
      total: product.price
    };
  }
});

Helpers.addPermissions(CartProducts);