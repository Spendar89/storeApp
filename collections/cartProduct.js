CartProducts = new Meteor.Collection("cartProducts");

_.extend(CartProducts, {
  build: function (product) {
    var productId = product && product._id;
    return {
      productId: productId,
      product: product,
      options: {},
      price: product.price
    };
  }
});

Helpers.addPermissions(Carts);