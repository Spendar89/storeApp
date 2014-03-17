/**
 * @jsx React.DOM
 */

ProductsBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var productGroup = Session.get("productGroup");
    var _id = productGroup._id;
    return {
      productGroup: productGroup,
      products: Products.find({productGroupId: _id}, {sort: {date_created: -1}}).fetch()
    };
  },

  render: function () {
    var products = this.state.products;
    var newProduct = Session.get("newProduct");
    var newProductId = newProduct && newProduct._id;
    var currentEditId = Session.get("editProductId") || newProductId;

    return (
      <div className="products-list">
        <h1> Current {this.state.productGroup.name + "s"} </h1>
        <ul className="col-sm-12 row">
          {products.map(function (product, i) {
            var productId = product._id
            var editProduct = function () {
                Session.set("editProductId", productId);
            };
            var removeProduct = function () {
              Meteor.call("productsRemove", productId);
            };
            return BlockRow({
              index: i,
              isLast: i + 1 === products.length,
              key: productId,
              doc: product,
              currentlyEditing: currentEditId === productId,
              handleEdit: editProduct,
              handleRemove: removeProduct,
              classString: 'products',
              showPath: 'products/' + productId
            })
          })}
        </ul>
      </div>
    );
  }
});