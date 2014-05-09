Carts = new Meteor.Collection("carts");

_.extend(Carts, {
  build: function (userId) {
    var user = Meteor.user() || {};
    var defaultAddress = {
      houseNumber: "default number",
      street: "default street",
      city: "default city",
      state: "default state",
      zipcode: "default zipcode"
    };
    return {
      storeId: "",
      userId: userId,
      cartProducts: [],
      subtotal: null,
      discounts: null,
      tax: null,
      total: null,
      active: true,
      status: "shopping",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address || defaultAddress,
      payment: {}
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