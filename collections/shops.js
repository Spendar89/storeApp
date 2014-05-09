Shops = new Meteor.Collection("shops");

Shops.allow({
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

if (Meteor.isServer) {
  AppDispatcher.register("Shop", {
    insert: function (shop) {
      console.log("inserting shop " + JSON.stringify(shop));
      Shops.insert(shop);
    },

    update: function (payload) {
      var id = payload.id;
      var updates = payload.updates;
      return Shops.update({ _id: id }, { $set: updates });
    },

    remove: function (id) {
      return Shops.remove(id);
    }
  });
}



// Meteor.call("handleViewAction", {
//   key: "Shop",
//   actionType: "insert",
//   payload: {
//     name: "Doggie Dude",
//     location: "Washington DC"
//   },
//   simulation: function () {
//     console.log("I'm a simulation!!!");
//   }
// });