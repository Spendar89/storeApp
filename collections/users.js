Users = Meteor.users;

Helpers.addPermissions(Users);

User = function (doc) {
  this.data = doc;
};

User.prototype = {
  set: function (key, value) {
    //TODO: whitelist attributes that can be set;
    this.data[key] = value;
    return this.data[key];
  },

  save: function () {
    var afterSave = function (err, num) {
      return err || this.data;
    };
    return Meteor.call("usersUpdate", this.data, afterSave);
  }
};