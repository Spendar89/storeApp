/**
 * @jsx React.DOM
 */

CartCheckoutForm = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      user: Meteor.user(),
      cart: Session.get("cart"),
      stripeCustomer: Session.get("stripeCustomer")
    }
  },

  renderCartNameForm: function () {
    return <CartNameForm header="Customer Name"
                          className="user-name-form-div"
                          keys={[ "firstName",
                                  "lastName" ]}/>
  },

  renderCartAddressForm: function () {
    var user = this.state.user;
    var userAddress = user && _.isEmpty(user.address);
    return  <CartAddressForm header="Customer Address"
                              className="user-address-form-div"
                              syncUser={userAddress}
                              keys={[ "streetAddress",
                                      "city",
                                      "state",
                                      "zipcode" ]}/>
  },

  renderCartAddress: function () {
    var cart = this.state.cart;
    var fullName = cart.firstName + " " + cart.lastName;
    var cartAddress = cart.address;
    return (
      <div className="user-details margin-bottom">
        <h3 className="form-header">Ship to: </h3>
        <h4> {fullName} </h4>
        <h4> {cartAddress.streetAddress} </h4>
        <h4> {cartAddress.city}, {cartAddress.state} </h4>
        <h4> {cartAddress.zipcode} </h4>
      </div>
    )
  },

  renderConfirmation: function () {
    return (
      <div className="order-confirmation">
        <h1 className="centered">Order Details:</h1>
        {this.renderCartAddress()}
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
        {this.renderCartNameForm()}
        {this.renderCartAddressForm()}
      </div>
    )

  },

  render: function () {

    if (this.state.cart.active) {
      var content = this.renderForms();
    } else {
      var content = this.renderConfirmation();
    }
    return (
      <div className={this.props.className}>
        {content}
        <StripeCustomerBlock cart={this.state.cart}
                             user={this.state.user}
                             stripeCustomer={this.state.stripeCustomer}/>
      </div>
    )
  }
});
