AdminProductGroupsIndexController = ApplicationController.extend({
  layoutTemplate: 'default_layout',

  onBeforeAction: function () {
    var data = this.data();
    console.log(data);
    this.newProductGroup = data.newProductGroup;
    Session.set("newProductGroup", this.newProductGroup);
  },

  data: function () {
    var store = Session.get("store");
    return {
      newProductGroup: ProductGroups.getNewProductGroup(store)
    };
  },

  onAfterAction: function () {
    var that = this;
    this.defaultTemplate().rendered = function () {
      that.renderCart();
      React.renderComponent(ProductGroupsBlock({}),
        document.getElementById('productGroupsBlock')
      );
      React.renderComponent(ProductGroupForm({}),
        document.getElementById('productGroupForm')
      );
    };

  }
});