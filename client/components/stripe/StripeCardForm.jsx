/**
 * @jsx React.DOM
 */

StripeCardForm = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    var name = StoreApp.currentUser.fullName();
    //also add option for order address
    var address = Session.get("order").address;
    return {
      number: null,
      cvc: null,
      exp_month: null,
      exp_year: null,
      name: name,
      address_line1: address.streetAddress,
      address_line2: null,
      address_city: address.city,
      address_state: address.state,
      address_zip: address.zipcode,
      address_country: "United States",
      useOrderAddress: true
    };
  },

  handleStripeCustomer: function (err, res) {
    if (err) {
      this.setState({error: err});
    } else {
      console.log("Stripe customer success! ");
      console.log(res);
    }
  },

  componentDidUpdate: function () {
    var error = this.state.error;
    if (error) {
      console.log(error.message);
    }
  },

  handleClick: function (e) {
    Stripe.card.createToken(this.state, function (status, response) {
      if (response.error) {
        this.setState({
          error: response.error
        });
      } else if (response.id) {
        var token = response.id;
        var cb = this.handleStripeCustomer;
        // move customer create to right afer user is created (via user insert
        // hook...) then replaced this with stripe.customer.createCard method
        // which will allow for multiple cards instead of replacing each one
        Meteor.call("stripeCustomersCreateCard", Meteor.user(), token, cb);
        // Meteor.call("stripeCustomersCreate", Meteor.userId(), token, cb);

        // check if save card box is checked... if yes: saved card/token to customer
        // and if not: purchase... key is that the only button is the purchase button...
        // clicking the checkbox changes the component to SavedStripeBlock
        // (means Meteor.call('stripecustomersCreate') must be in conditional)
      }

    }.bind(this));
  },

  renderInput: function (key, label) {
    return (
      <div className="form-group">
        <label className="control-label col-sm-2">
          {label}
        </label>
        <div className="col-sm-10">
          <input className="form-control"
                 placeholder={label}
                 valueLink={this.linkState(key)}/>
        </div>
      </div>
    )
  },

  renderAddressInputs: function () {
    if (!this.state.useOrderAddress) {
      return (
        <div className="address-inputs-div">
          {this.renderInput('name', 'Cardholder Name')}
          {this.renderInput('address_line1', 'Street Address')}
          {this.renderInput('address_city', 'City')}
          {this.renderInput('address_state', 'State')}
          {this.renderInput('address_country', 'Country')}
          {this.renderInput('address_zip', 'Zipcode')}
        </div>
      )
    }
  },

  renderTokenInputs: function () {
    return (
      <div className="token-inputs-div">
        {this.renderInput('number', 'Card Number')}
        {this.renderInput('exp_month', 'Expiration Month')}
        {this.renderInput('exp_year', 'Expiration Year')}
        {this.renderInput('cvc', 'CVC Number')}
      </div>
    )
  },

  toggleAddress: function () {
    if (this.state.useOrderAddress) {
      this.setState({useOrderAddress: false});
    } else {
      this.setState({useOrderAddress: true});
    }
  },

  renderAddressCheckBox: function () {
    return (
      <div className="form-group">
        <label className="control-label col-sm-6">
          Use Order Address as Billing Address
        </label>
        <div className="col-sm-2">
         <input type="checkbox"
                checked={this.state.useOrderAddress}
                onChange={this.toggleAddress}/>
        </div>
      </div>
    )
  },

  renderSaveBtn: function () {
    return (
      <div className="form-group">
        <div className="col-sm-12">
          <a onClick={this.handleClick}
             className="btn btn-success form-control">
              Save Card
          </a>
        </div>
      </div>
    )
  },

  render: function () {
    return (
      <form className="payment-form form-horizontal">
        <h3 className="form-header">
          Payment:
        </h3>
        {this.renderTokenInputs()}
        {this.renderAddressCheckBox()}
        {this.renderAddressInputs()}
        {this.renderSaveBtn()}
      </form>
    )
  }
});