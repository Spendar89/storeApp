/**
 * @jsx React.DOM
 */

ProductGroupsBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var newProductGroup = Session.get("newProductGroup");
    return {
      productGroups: ProductGroups.find().fetch(),
      currentEditId: newProductGroup && newProductGroup._id
    };
  },

  render: function () {
    var that = this;
    var currentEditId = this.state.currentEditId;
    var productGroups = this.state.productGroups;
    return (
      <div className="product-groups-list">
        <h2> Current Product Groups </h2>
        <ul className="col-sm-12 row">
          {this.state.productGroups.map(function (productGroup, i) {
            var editProductGroup = function () {
              Session.set("editProductGroupId", productGroup._id);
            };
            var removeProductGroup = function () {
              Meteor.call("productGroupsRemove", productGroup._id);
            };
            return BlockRow({
              index: i,
              isLast: i + 1 === productGroups.length,
              key: productGroup._id,
              doc: productGroup,
              currentlyEditing: currentEditId === productGroup._id,
              handleEdit: editProductGroup,
              handleRemove: removeProductGroup,
              classString: 'product-group',
              showPath: '/product_groups/' + productGroup._id + '/products'
            })
          })}
        </ul>
      </div>
    );
  }
});