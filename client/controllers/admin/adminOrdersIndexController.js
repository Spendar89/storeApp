AdminOrdersIndexController =  AdminController.extend({

  onBeforeAction: function () {
    Session.set("orders", this.data().orders);
  },

  data: function () {
    return {
      orders: Carts.find({status: "ordered"}).fetch()
    };
  },

  onAfterAction: function () {
    this.defaultTemplate().rendered = function () {
      $('body, html').addClass('admin');
      React.renderComponent(AdminOrdersTable({}),
        document.getElementById('adminOrdersTable')
      );
    };

  }
});