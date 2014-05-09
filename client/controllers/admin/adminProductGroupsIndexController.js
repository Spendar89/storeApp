AdminProductGroupsIndexController = ApplicationController.extend({
  layoutTemplate: 'admin_layout',

  onBeforeAction: function () {
    var data = this.data();
    var newProductGroup = data.newProductGroup;
    var editProductGroup = ProductGroups.findOne(Session.get("editProductGroupId"));

    Session.set("newProductGroup", newProductGroup);
    Session.set("editProductGroup", editProductGroup);
  },

  setProductPropertyRules: function () {
    var productGroup = Session.get("editProductGroup");
    if (productGroup) {
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
      $('body, html').addClass('admin');
      React.renderComponent(ProductGroupsBlock({}),
        document.getElementById('productGroupsBlock')
      );
      React.renderComponent(ProductGroupForm({defaultKeys: defaultKeys}),
        document.getElementById('productGroupForm')
      );
    };

  }
});