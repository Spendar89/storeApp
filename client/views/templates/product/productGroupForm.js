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

var productPropertyRulesHelper = {
  dep: new Deps.Dependency,
  addedLength: 0,
  getLength: function () {
    if (currentProductGroup.get()) {
      var currentRules = currentProductGroup.getProductPropertyRules();
      return currentRules.length + this.addedLength;
    } else {
      return this.addedLength;
    }
  },
  getArray: function () {
    this.dep.depend();
    var array = [];
    var length = this.getLength();
    if (length) {
      _.times(this.getLength(), function (i) {
        array.push({
          index: i
        });
      });
    }
    return array;
  },
  addRule: function (newState) {
    this.dep.changed();
    this.addedLength += 1;
    return this.addedLength;
  },
  reset: function () {
    this.dep.changed();
    this.addedLength = 0;
    return this.addedLength;
  }
};



Template.productGroupForm.helpers({
  productGroupAutoForm: function () {
    var autoForm = new AutoForm(ProductGroups);
    autoForm.hooks({
      before: {
        insert: function (doc) {
          doc.storeId = currentStore.get()._id;
          return doc;
        }
      },
      onSuccess: function (operation, productGroupId, template) {
        currentProductGroup.clear();
        productPropertyRulesHelper.reset();
      },
      onError: function (operation, error, template) {
        console.log("there was an error " + error);
      }
    });
    return autoForm;
  },
  currentFormId: function () {
    var currentFormAction = Session.get("currentFormAction") || "insert";
    return currentFormAction + "ProductGroup";
  },
  currentFormAction: function () {
    return Session.get("currentFormAction") || "insert";
  },
  store: function () {
    return Session.get("currentStore");
  },
  productPropertyRules: function () {
    return productPropertyRulesHelper.getArray();
  },
  productPropertyRule: function () {
    return {
      name: "productPropertyRules." + this.index + ".name",
      kind: "productPropertyRules." + this.index + ".kind"
    };
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

Template.productGroupForm.events({
  "click .add-rule": function (e, form) {
    e.preventDefault();
    // $(form.find('button')).trigger('click');
    productPropertyRulesHelper.addRule();
  }

});