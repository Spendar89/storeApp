/**
 * @jsx React.DOM
 */

AdminOrdersBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      orders: Orders.find().fetch()
    };
  },

  handleEdit: function (order) {
    Session.set("editOrder", order);
  },

  handleRemove: function (order) {
    Meteor.call("ordersRemove", order._id);
  },

  renderOrder: function (order, index) {
    return <AdminOrderRow order={order} key={index}/>
  },

  render: function () {
    return (
      <div className="col-sm-12 col-md-6">
        <div className="well">
          <div className="header">
            Current Orders
          </div>
          {_.map(this.state.orders, this.renderOrder)}
        </div>
      </div>

    );
  }
});