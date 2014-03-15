var propertyHelper = {};

Template.productForm.helpers({
  currentFormHeader: function () {
    return {
      collectionName: productGroup.name,
      formState: Session.get('productFormState') || 'New',
      currentFormAction: Session.get("currentFormAction") || "insert"
    };
  },

  properties: function () {
    return _.map(productGroup.productPropertyRules, function (rule, i) {
      return {
        propertyName: rule.name,
        propertyHiddenInput: "properties." + i + ".name",
        propertyInput: "properties." + i + "." + rule.kind + "Value"
      };
    });
  },

  productAutoForm: function () {
    var autoForm = new AutoForm(Products);
    autoForm.hooks({
      formToDoc: function (doc) {
        doc.productGroupId = productGroup._id;
        doc.images = Session.get("currentProductImageIds");
        return doc;
      },
      onSuccess: function (operation, productGroupId, template) {
        Session.set("currentProductImageIds", []);
      },
      onError: function (operation, error, template) {
        console.log("there was an error " + error);
      }
    });
    return autoForm;
  },

  currentFormId: function () {
    var currentFormAction = Session.get("currentFormAction") || "insert";
    return currentFormAction + "Product";
  }
});