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
      return sum + parseInt(cartProduct.price);
    }, 0);
  }
});

Helpers.addPermissions(Carts);