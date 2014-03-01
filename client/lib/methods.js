Meteor.methods({
  insertProductGroup: function (params) {
    console.log("inserting new product...");
  },
  updateProductGroup: function (productGroupId, params) {
    console.log("updating productGroup with id " + productGroupId + "...");
    Session.set("editProductGroup", null);
  },
  insertDefaultStore: function () {
    Stores.insert({
      name: "Jake Dude's Store",
      category: "toys",
      active: true,
      description: "DC's best toystore in the world!"
    });
  },
  insertDefaultProductGroup: function () {
    ProductGroups.insert({
      name: "Bike",
      category: "sports",
      active: true,
      description: "Bikes are very fun to ride."
    });
  }
});