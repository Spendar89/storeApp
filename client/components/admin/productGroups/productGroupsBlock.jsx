/**
 * @jsx React.DOM
 */

ProductGroupsBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var editProductGroup = Session.get("editProductGroup");
    return {
      productGroups: ProductGroups.find().fetch(),
      currentEditId: editProductGroup && editProductGroup._id
    };
  },

  handleEdit: function (productGroup) {
    Session.set("editProductGroup", productGroup);
  },

  handleRemove: function (productGroup) {
    Meteor.call("productGroupsRemove", productGroup._id);
  },

  renderProductGroup: function (productGroup, i) {
    return BlockRow({
      isLast: i + 1 === this.state.productGroups.length,
      key: i,
      doc: productGroup,
      currentlyEditing: this.state.currentEditId === productGroup._id,
      handleEdit: this.handleEdit.bind(this, productGroup),
      handleRemove: this.handleRemove.bind(this, productGroup),
      classString: 'product-group',
      showPath: '/admin/product_groups/' + productGroup._id + '/products'
    });
  },

  render: function () {
    return (
      <div className="col-sm-12">
        <ul className="col-sm-12 well">
          <div className="header"> Current Product Groups </div>
          {this.state.productGroups.map(this.renderProductGroup)}
        </ul>
      </div>

    );
  }
});