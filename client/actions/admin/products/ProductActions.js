ProductActions = {
  remove: function (product) {
    Helpers.handleViewAction({
      key: "products",
      actionType: "remove",
      payload: product,
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

  edit: function (product) {
    Session.set("newProduct", null);
    Session.set("editProduct", product);
  }
};