/**
 * @jsx React.DOM
 */

ProductsProductGroupFilter = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var filter = Session.get("productsFilter");
    return {
      productGroups: ProductGroups.find().fetch(),
      productGroupId: filter && filter.productGroupId
    };
  },

  updateFilter: function (productGroup) {
    var newFilter = _.extend({}, Session.get("productsFilter"));
    if (productGroup._id === newFilter.productGroupId) {
      newFilter.productGroupId = null;
    } else {
      newFilter.productGroupId = productGroup._id;
    }
    Session.set("productsFilter", newFilter);
  },

  renderFilter: function (productGroup, i) {
    var isActive = this.state.productGroupId === productGroup._id;
    var className = isActive ? "active" : null;
    var handleClick = this.updateFilter.bind(this, productGroup);
    return (
      <li key={i} className={className}>
        <a className="secondary centered" onClick={handleClick}>
          <h2>{productGroup.name}s</h2>
        </a>
      </li>
    )

  },

  render: function () {
    return (
    <div className="centered">
      <ul className="nav inline-block filter-nav nav-pills">
        {_.map(this.state.productGroups, this.renderFilter)}
      </ul>
    </div>
    )
  }
});