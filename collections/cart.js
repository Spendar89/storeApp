Carts = new Meteor.Collection("carts");

_.extend(Carts, {
  build: function (userId) {
    return {
      storeId: "",
      userId: userId,
      cartProducts: [],
      subtotal: 0
    };
  },

  getSubtotal: function (cart) {
    return _.reduce(cart.cartProducts, function (sum, cartProduct) {
      var total = parseInt(cartProduct.product.price) * cartProduct.quantity;
      return sum + total;
    }, 0);
  }
});

Helpers.addPermissions(Carts);