ProductGroupsIndexController = ApplicationController.extend({
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

  action: function () {
    if (this.ready()) {
      this.render();
    }
  },

  onAfterAction: function () {
    var templateName = this.lookupTemplate();
    Template[templateName].rendered = function () {
      React.renderComponent(ProductGroupsBlock({}),
        document.getElementById('productGroupsBlock')
      );
      React.renderComponent(ProductGroupForm({}),
        document.getElementById('productGroupForm')
      );
    };

  }
});