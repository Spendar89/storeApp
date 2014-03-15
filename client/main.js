Deps.autorun(function () {
  // currentProductGroups = ProductGroups.find({}).fetch();
  var user = Meteor.user();
  var store = Stores.findOne();

  if (user) {
    currentUser = user;
    Session.set("currentUser", user);
    Session.set("currentUserId", user._id);
  }
  if (store) {
    Session.set('currentStore', store);
    Session.set('store', store);
    currentStore = new LiveDoc(store);
    Session.set('currentStoreId', store._id);
  }

  // Session.set('currentProductGroups', productGroups);


});
