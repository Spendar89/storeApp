Orders = new Meteor.Collection("orders");

Order = function (doc) {
  // this.collection = Orders;
  this.data = doc;
};

Helpers.addPermissions(Orders);

Orders.after.update(function (userId, order) {
  if (!order.active) {
    Carts.update({ userId: userId, _id: order.cartId}, { $set: { active: false } });
  }
});

Orders.before.insert(function (userId, order) {
  if (!order.cartId) {
    return false;
  } else if (Orders.findOne({cartId: order.cartId})) {
    return false;
  }
});

Order.prototype = {
  set: function (key, value) {
    //TODO: whitelist attributes that can be set;
    this.data[key] = value;
    return this.data[key];
  },

  setDefault: function (cart) {
    var user = Meteor.user();
    var defaultAddress = {
      houseNumber: "default number",
      street: "default street",
      city: "default city",
      state: "default state",
      zipcode: "default zipcode"
    };
    this.data = {
      cartId: cart && cart.active && cart._id,
      userId: user._id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      address: user.address || defaultAddress,
      tax: 0,
      active: true,
      status: "checkout",
      shipping: {},
      payment: {}
    };
  },

  replaceData: function (newData) {
    this.data = newData;
  },

  save: function () {
    var afterSave = function (err, success) {
      return err || success;
    };
    console.log("Saving default orrrderrr!!!");
    return Meteor.call("ordersUpsert", this.data, afterSave);
  },

  getTotal: function () {
    var cart = Session.get("cart")
    return cart.total || cart.subtotal;
  }
};