Orders = new Meteor.Collection("orders");

Order = function (doc) {
  // this.collection = Orders;
  this.data = doc;
};

Helpers.addPermissions(Orders);

Order.prototype = {
  set: function (key, value) {
    //TODO: whitelist attributes that can be set;
    this.data[key] = value;
    return this.data[key];
  },

  setDefault: function (user, cart) {
    this.data = {
      cartId: cart._id,
      userId: user._id,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      address: {
        houseNumber: null,
        street: null,
        city: null,
        state: null,
        zipcode: null
      },
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
  }
};