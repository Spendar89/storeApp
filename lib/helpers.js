AppStores = {};
Helpers = {

  addPermissions: function (collection) {
    collection.allow({
      remove: function () {
        return true;
      },
      insert: function () {
        return true;
      },
      update: function () {
        return true;
      }
    });
  },

  handleViewAction: function (action) {
    Meteor.call("handleViewAction", action);
  }
};