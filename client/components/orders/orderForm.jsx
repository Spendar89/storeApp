/**
 * @jsx React.DOM
 */

OrderForm = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      user: Meteor.user(),
      order: Session.get("order"),
      stripeCustomer: Session.get("stripeCustomer")
    }
  },

  renderOrderNameForm: function () {
    return <OrderNameForm header="Customer Name"
                          className="user-name-form-div"
                          keys={[ "firstName",
                                  "lastName" ]}/>
  },

  renderOrderAddressForm: function () {
    var userAddress = _.any(this.state.user.address)
    return  <OrderAddressForm header="Customer Address"
                              className="user-address-form-div"
                              syncUser={!userAddress}
                              keys={[ "streetAddress",
                                      "city",
                                      "state",
                                      "zipcode" ]}/>
  },

  renderOrderAddress: function () {
    var order = this.state.order;
    var fullName = order.firstName + " " + order.lastName;
    var orderAddress = order.address;
    return (
      <div className="user-details margin-bottom">
        <h3 className="form-header">Ship to: </h3>
        <h4> {fullName} </h4>
        <h4> {orderAddress.streetAddress} </h4>
        <h4> {orderAddress.city}, {orderAddress.state} </h4>
        <h4> {orderAddress.zipcode} </h4>
      </div>
    )
  },

  renderConfirmation: function () {
    return (
      <div className="order-confirmation">
        <h1 className="centered">Order Details:</h1>
        {this.renderOrderAddress()}
      </div>
    )
  },

  setEditing: function () {
    this.setState({editing: true});
  },

  renderEditingBtn: function () {
    return (
      <a className="editing-btn"
         onClick={this.setEditing}>
        Edit Shipping information
      </a>
    )
  },

  renderForms: function () {
    return (
      <div className="order-forms">
        <h1 className="centered">Shipping and Payment:</h1>
        {this.renderOrderNameForm()}
        {this.renderOrderAddressForm()}
      </div>
    )

  },

  render: function () {

    if (this.state.order.active) {
      var content = this.renderForms();
    } else {
      var content = this.renderConfirmation();
    }
    return (
      <div className={this.props.className}>
        {content}
        <StripeCustomerBlock order={this.state.order}
                             user={this.state.user}
                             stripeCustomer={this.state.stripeCustomer}/>
      </div>
    )
  }
});
