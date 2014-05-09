Users = Meteor.users;

Helpers.addPermissions(Users);

User = function (doc) {
  this.data = doc || {
    firstName: null,
    lastName: null,
    payments: {}
  };
};

User.prototype = {
  set: function (key, value) {
    //TODO: whitelist attributes that can be set;
    this.data[key] = value;
    return this.data[key];
  },

  setAll: function (newData) {
    this.data = newData;
  },

  save: function () {
    var afterSave = function (err, num) {
      return err || this.data;
    };
    return Meteor.call("usersUpdate", this.data, afterSave);
  },

  fullName: function () {
    return this.data.firstName + " " + this.data.lastName;
  },

  hasStripe: function () {
    return this.data.payments && this.data.payments.stripe
  },

  stripeDefault: function () {
    if (this.hasStripe()) {
      return this.data.payments.stripe.cards.data[0]
    }
  }

};