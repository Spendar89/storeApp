/**
 * @jsx React.DOM
 */

AdminOrdersTable = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    return {
      orders: Session.get("orders"),
      columns: ["_id", "firstName", "lastName", "address", "status", "total"],
      headers: ["Order ID", "First Name", "Last Name", "Address", "Status", "Total"],
      searchFilter: ""
    };
  },

  handleEdit: function (order) {
    OrderActions.edit(order);
  },

  handleRemove: function (order) {
    OrderActions.remove(order);
  },

  matchesTextFilter: function (order) {
    var orderJSON = JSON.stringify(_.values(order));
    var filter = this.state.searchFilter
    return Util.matchesTextFilter(orderJSON, filter);
  },

  renderAdminOrderRow: function (order, i) {
    if (this.matchesTextFilter(order)) {
       return <AdminOrderRow columns={this.state.columns}
                             collection={order}
                             key={i}/>
    } else {
      // do nothing
    }
  },

  renderTableHeader: function (header, i) {
    return <th key={i}>{header}</th>
  },

  render: function () {
   var columns = this.state.columns;
    return (
      <div className="well admin-table-div">
        <div className="row">
          <div className="col-sm-6">
            <div className="header">
              Current Orders
            </div>
          </div>
          <div className="col-sm-6">
            <input className="col-sm-12 form-control form-group"
                   type="text"
                   placeholder="Seach Current Orders"
                   valueLink={this.linkState('searchFilter')}/>
          </div>
        </div>
        <table className="table table-bordered admin-table table-hover">
          <thead>
            <tr>
              {_.map(this.state.headers, this.renderTableHeader)}
            </tr>
          </thead>
          <tbody>
            {_.map(this.state.orders, this.renderAdminOrderRow)}
          </tbody>
        </table>
      </div>
    );
  }
});