Carts = new Meteor.Collection("carts");

_.extend(Carts, {
  build: function (userId) {
    return {
      storeId: "",
      userId: userId,
      cartProducts: [],
      subtotal: 0,
      discounts: 0,
      total: 0,
      active: true,
      checkedOut: false
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

Carts.before.update(function (userId, cart, fieldNames, modifier) {
  if (modifier && modifier.cartProducts) {
    var subtotal = Carts.getSubtotal(modifier);
    modifier.subtotal = modifier.total = subtotal;
  }
});

Carts.before.remove(function (userId, cart) {
  Orders.remove({userId: userId, cartId: cart._id});
});