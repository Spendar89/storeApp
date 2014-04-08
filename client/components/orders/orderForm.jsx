/**
 * @jsx React.DOM
 */

OrderForm = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    return StoreApp.currentOrder.data;
  },

  componentWillUpdate: function (nextProps, nextState) {
    Meteor.call("ordersUpsert", nextState);
  },

  handleAddress: function (e) {
    this.state.address[e.target.name] = e.target.value;
    this.setState({address: this.state.address});
  },

  renderDetailInputs: function () {
    return (
      <div className="detail-inputs">
        <div className="form-group">
          <label className="control-label col-sm-2">
            Active
          </label>
          <div className="col-sm-10">
            <input className="form-control"
                   placeholder="Active"
                   valueLink={this.linkState('active')}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">
            Status
          </label>
          <div className="col-sm-10">
            <input className="form-control"
                   placeholder="Status"
                   valueLink={this.linkState('status')}/>
          </div>
        </div>
      </div>
    )
  },

  renderAddressInput: function (key, label) {
    var address = this.state.address || {};
    return (
      <div className="form-group">
        <label className="control-label col-sm-2">
          {label}
        </label>
        <div className="col-sm-10">
          <input className="form-control"
                 name={key}
                 value={address[key]}
                 placeholder={label}
                 onChange={this.handleAddress}/>
        </div>
      </div>
    )
  },

  renderAddressInputs: function () {
    return (
      <div className="address-inputs">
        <h3 className="form-header">
          Address:
        </h3>
        { this.renderAddressInput("houseNumber", "House") }
        { this.renderAddressInput("street", "Street") }
        { this.renderAddressInput("city", "City") }
        { this.renderAddressInput("state", "State") }
        { this.renderAddressInput("zipcode", "Zipcode") }
      </div>
    )

  },

  renderCustomerInputs: function () {
    return (
      <div className="customer-inputs">
        <h3 className="form-header">
          Customer:
        </h3>
        <div className="form-group">
          <label className="control-label col-sm-2">
            First Name
          </label>
          <div className="col-sm-10">
            <input className="form-control"
                   placeholder="First Name"
                   valueLink={this.linkState('firstName')}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">
            Last Name
          </label>
          <div className="col-sm-10">
            <input className="form-control"
                   placeholder="Last Name"
                   valueLink={this.linkState('lastName')}/>
          </div>
        </div>
      </div>
    )
  },

  render: function () {
    return (
      <div className={this.props.className}>
        <form className="checkout-order-form form-horizontal" role="form">
         {this.renderCustomerInputs()}
         {this.renderAddressInputs()}
        </form>
      </div>
    )
  }
});
