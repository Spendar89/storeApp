Users = Meteor.users;

Helpers.addPermissions(Users);

User = function (doc) {
  this.data = doc;
};

User.prototype = {
  set: function (key, value) {
    this.data[key] = value;
    return this.data[key];
  },
  save: function () {
    return Meteor.call("usersUpdate", this.data, function (err, num) {
      if (err) {
        // there was an error
      } else {
        return this.data;
      }
    });
  }
};