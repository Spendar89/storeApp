OrderActions = {
  insert: function () {

  },

  remove: function (order) {
    Helpers.handleViewAction({
      key: "orders",
      actionType: "remove",
      payload: order,
      simulation: function () {
        //do something on client
      }
    });
  },

  upsert: function (product) {
    Helpers.handleViewAction({
      key: "products",
      actionType: "upsert",
      payload: product,
      simulation: function () {
        console.log("removing product!!");
      }
    });
  },

  edit: function (order) {
    Session.set("editOrder", order);
  }
};