Orders = new Meteor.Collection("orders");

Order = function (doc) {
  // this.collection = Orders;
  this.data = doc;
};

Helpers.addPermissions(Orders);

Orders.after.update(function (userId, order) {
  if (!order.active) {
    Carts.update({ _id: order.cartId}, { active: false });
  }

});

Order.prototype = {
  set: function (key, value) {
    //TODO: whitelist attributes that can be set;
    this.data[key] = value;
    return this.data[key];
  },

  setDefault: function () {
    var user = Meteor.user();
    this.data = {
      cartId: Session.get("cartId"),
      userId: user._id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      address: {
        houseNumber: "default number",
        street: "default street",
        city: "default city",
        state: "default state",
        zipcode: "default zipcode"
      },
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
    return Meteor.call("ordersUpsert", this.data, afterSave);
  },

  getCart: function () {
    var cartId = this.data.cartId;
    return Carts.findOne(cartId);
  },

  getTotal: function () {
    var cart = this.getCart();
    return cart.total || cart.subtotal;
  }
};