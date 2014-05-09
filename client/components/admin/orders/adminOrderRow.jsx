/**
 * @jsx React.DOM
 */

AdminOrderRow = React.createClass({

  handleEdit: function (order) {
    Session.set("editOrder", order);
  },

  handleRemove: function (order) {
    Meteor.call("ordersRemove", order._id);
  },

  componentWillMount: function () {
    this.defaultColumns = _.keys(this.props.collection);
  },

  render: function () {
    var columns = this.props.columns || this.defaultColumns;
    return (
      <tr>
        {_.map(columns, function(column, i) {
          return <td key={i}> {this.props.collection[column]} </td>;
        }.bind(this))}
      </tr>
    );
  }
});