ProductGroupsIndexController = RouteController.extend({
  layoutTemplate: 'default_layout',

  before: function () {
    var data = this.getData();
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
    if (this.newProductGroup) this.render();
    Template[this.template].rendered = function () {
      React.renderComponent(ProductGroupsBlock({}),
        document.getElementById('productGroupsBlock')
      );
      React.renderComponent(ProductGroupForm({}),
        document.getElementById('productGroupForm')
      );
    };
  }
});