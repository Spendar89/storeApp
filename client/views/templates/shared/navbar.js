Template.navbar.helpers({
  currentStore: function () {
    return Session.get("currentStore");
  },

  productGroupCategories: function () {
    return ProductGroups.uniqueCategories();
  }
});