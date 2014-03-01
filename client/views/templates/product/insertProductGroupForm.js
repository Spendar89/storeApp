var steps = {
  1: {
    header: "Step 1:",
    text: "Add Basic Info"
  },
  2: {
    header: "Step 2:",
    text: "Determine Properties"
  }
};

Template.insertProductGroupForm.helpers({
  productGroupAutoForm: function () {
    var autoForm = new AutoForm(ProductGroups);
    autoForm.hooks({
      // after: {
      //   update: function (docId, modifier) {

      //     return this;
      //   }
      // },
      // onSubmit: function () {
      //   // alert("hey");
      // },
      onSuccess: function (operation, productGroupId, template) {
        if (operation === "insert") {
          var productGroup = ProductGroups.findOne({
            _id: productGroupId
          });
          Session.set("currentProductGroup", productGroup);
          incrementProductGroupStep();
        } else {
          Session.set("currentProductGroup", null);
        }
        Session.set('productGroupFormState', 'New');
      },
      onError: function () {
        console.log("there was an error");
      }
    });
    return autoForm;
  },
  currentFormId: function () {
    var currentFormAction = Session.get("currentFormAction") || "insert";
    return currentFormAction + "ProductGroup";
  },
  currentProductGroup: function () {
    return currentProductGroup();
  },
  currentFormAction: function () {
    return Session.get("currentFormAction") || "insert";
  },
  store: function () {
    return Session.get("currentStore");
  },
  productPropertyRules: function () {
    return currentProductPropertyRules();
  },
  currentStepNumber: function () {
    return Session.get('currentProductGroupStep') || 1;
  },
  currentStep: function () {
    var formState = Session.get('productGroupFormState');
    if (formState != "Edit") {
      var step = Session.get('currentProductGroupStep') || 1;
      return steps[step];
    }
  },
  formState: function () {
    return Session.get('productGroupFormState') || 'New';
  }
});

Template.insertProductGroupForm.events({
  "click .add-rule": function () {
    ProductPropertyRules.insert({
      productGroupId: currentProductGroup()._id
    });
  }

});