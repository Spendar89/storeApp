_.extend(Template._product_groups_table, {
  productGroups: function () {
    return ProductGroups.find().fetch();
  },
  store: function () {
    return currentStore.get();
  },
  events: {
    "click .delete": function () {
      ProductGroups.remove(this._id);
      Session.set("currentFormAction", 'insert');

      // Session.set("currentProductGroup", null);
    },
    "click .edit": function () {
      Session.set("currentFormAction", 'update');
      // Session.set("currentProductGroup", this);
      currentProductGroup.set(this);
      Session.set('productGroupFormState', 'Edit');
      $('.product-group-row').removeClass("currentProductGroup");
      $('#' + this._id).addClass("currentProductGroup");
    }
  }
});