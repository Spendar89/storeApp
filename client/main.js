Meteor.autorun(function () {
  var productGroups = ProductGroups.find({}).fetch(),
    user = Meteor.user(),
    store = Stores.findOne();
  if (user) {
    currentUser = user;
    Session.set("currentUser", user);
    Session.set("currentUserId", user._id);
  }
  if (store) {
    Session.set('currentStore', store);
    Session.set('currentStoreId', store._id);
  }
  Session.set('currentProductGroups', productGroups);
});