AdminProductGroupsIndexController = ApplicationController.extend({
  layoutTemplate: 'admin_layout',

  onBeforeAction: function () {
    var data = this.data();
    var newProductGroup = data.newProductGroup;
    var editProductGroup = ProductGroups.findOne(Session.get("editProductGroupId"));

    Session.set("newProductGroup", newProductGroup);
    Session.set("editProductGroup", editProductGroup);
    // this.setProductPropertyRules();
  },

  setProductPropertyRules: function () {
    var productGroup = Session.get("editProductGroup");
    if (productGroup) {
      console.log("setting product property rules");
      var productGroupId = productGroup._id;
      var productPropertyRules = productPropertyRules.find({productGroupId: productGroupId});
      Session.set("productPropertyRules", productPropertyRules);
    }
  },

  data: function () {
    var store = Session.get("store");
    return {
      newProductGroup: ProductGroups.getNewProductGroup(store)
    };
  },

  onAfterAction: function () {
    var defaultKeys = ['name', 'description', 'category'];
    this.defaultTemplate().rendered = function () {

      React.renderComponent(ProductGroupsBlock({}),
        document.getElementById('productGroupsBlock')
      );
      React.renderComponent(ProductGroupForm({defaultKeys: defaultKeys}),
        document.getElementById('productGroupForm')
      );
    };

  }
});