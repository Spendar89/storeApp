/**
 * @jsx React.DOM
 */

AdminProductsBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      products: Products.find({productGroupId: this.props.key}, {
        sort: {date_created: -1}
      }).fetch(),
      editProduct: (Session.get("editProduct") || {})
    };
  },

  handleEdit: function (i) {
    var product = this.state.products[i];
    Session.set("newProduct", null);
    Session.set("editProduct", product);
  },

  handleRemove: function (i) {
    var product = this.state.products[i];
    Meteor.call("productsRemove", product._id);
  },

  renderProduct: function (product, i) {
    return BlockRow({
      key: i,
      isLast: i + 1 === this.state.products.length,
      doc: product,
      currentlyEditing: this.state.editProduct._id === product._id,
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
        {_.map(this.state.products, this.renderProduct)}
        </ul>
      </div>
    );
  }
});