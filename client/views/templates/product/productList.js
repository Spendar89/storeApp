Template.productList.helpers({
  products: function () {
    var prods =  Products.find().fetch();
    return prods;
  },
  product: function () {
    return this;
  },
  productPropertyRules: function () {
    return productGroup.productPropertyRules;
  }
});

Template.productList.events({
  "click .delete": function (e) {
    Products.remove(this._id);
  }
});