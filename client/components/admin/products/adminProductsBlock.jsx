/**
 * @jsx React.DOM
 */

AdminProductsBlock = React.createClass({

  handleEdit: function (i) {
    var product = this.props.products[i];
    ProductActions.edit(product);
  },

  handleRemove: function (i) {
    var product = this.props.products[i];
    ProductActions.remove(product);
  },

  renderProduct: function (product, i) {
    var editProduct = this.props.editProduct || {};
    return BlockRow({
      key: i,
      isLast: i + 1 === this.props.products.length,
      doc: product,
      currentlyEditing: editProduct._id === product._id,
      handleEdit: this.handleEdit,
      handleRemove: this.handleRemove,
      classString: 'products',
      showPath: '/products/' + product._id
    });
  },

  render: function () {
    return (
      <div className="col-sm-12">
        <ul className="col-sm-12 well">
        <div className="header"> {this.props.header} </div>
        {_.map(this.props.products, this.renderProduct)}
        </ul>
      </div>
    );
  }
});