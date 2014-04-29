AdminOrdersIndexController =  AdminOrdersIndexController.extend({

  onBeforeAction: function () {
    var data = this.data();
    Session.set("orders", data.orders);
    Session.set("carts", data.carts);
  },

  data: function () {
    return {
      orders: Orders.find().fetch(),
      carts:  Carts.find().fetch()
    };
  },

  onAfterAction: function () {
    this.defaultTemplate().rendered = function () {
      React.renderComponent(AdminOrdersBlock({}),
        document.getElementById('adminOrdersBlock')
      );
    };

  }
});