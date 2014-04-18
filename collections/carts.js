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
  if (cart.checkedOut && cart.active) {
    modifier.active = false;
  } else if (!cart.checkedOut && !cart.active) {
    modifier.active = true;
  } else {
    var subtotal = Carts.getSubtotal(modifier);
    // TODO: change total to reflect subtotal + tax - promos/discounts
    modifier.subtotal = modifier.total = subtotal;
  }

});