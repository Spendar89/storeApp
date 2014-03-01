// Template.insertProductGroupForm.hooks({
//   before: {
//     insert: function (doc) {
//       console.log("sdfgsdfg");
//     },
//     update: function (docId, modifier) {},
//     remove: function (docId) {},
//     "methodName": function (doc) {}
//   },
//   after: {
//     insert: function (error, result, template) {},
//     update: function (error, result, template) {},
//     remove: function (error, result, template) {},
//     "methodName": function (error, result, template) {}
//   },
//   onSubmit: function (error, result, template) {
//     console.log("kjhdsfkghsdfg");
//   },

//   //called when any operation succeeds, where operation will be
//   //"insert", "update", "remove", or the method name.
//   onSuccess: function (operation, result, template) {},

//   //called when any operation fails, where operation will be
//   //"validation", "insert", "update", "remove", or the method name.
//   onError: function (operation, error, template) {},
//   formToDoc: function (doc) {},
//   docToForm: function (doc) {}
// });

_.extend(Template._product_groups_table, {
  productGroups: function () {
    return Session.get("currentProductGroups");
  },
  store: function () {
    return Session.get("currentStore");
  },
  events: {
    "click .delete": function () {
      ProductGroups.remove(this._id);
      Session.set("currentFormAction", 'insert');
      Session.set("currentProductGroup", null);
    },
    "click .edit": function () {
      Session.set("currentFormAction", 'update');
      Session.set("currentProductGroup", this);
      Session.set('productGroupFormState', 'Edit');
      $('.product-group-row').removeClass("currentProductGroup");
      $('#' + this._id).addClass("currentProductGroup");
    }
  }
});