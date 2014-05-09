AdminController =  RouteController.extend({
  layoutTemplate: 'admin_layout',

  defaultTemplate: function () {
    var templateName = this.lookupTemplate();
    return Template[templateName];
  },


  waitOn: function () {
    var defaults = this.subscribe("adminDefaults", "q2dMF25K4Jb3Q3j7Y");
    var orders = this.subscribe("adminOrders");
    return [defaults, orders];
  }
});