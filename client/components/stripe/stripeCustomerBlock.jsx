/**
 * @jsx React.DOM
 */


StripeCustomerCardBlock = React.createClass({

  deleteCard: function () {
    var stripeCustomer = this.props.stripeCustomer;
    Meteor.call("stripeCustomersDeleteCard", Meteor.user(), this.props.key);
  },

  render: function () {
    var card = this.props.card;
    var cardNumber = Util.hiddenCard(card.last4);
    return (
      <div className="form-group saved-payment">
        <div className="card-number col-sm-12">
          {cardNumber}
        </div>
        <div className="col-sm-12 remove-card-div">
          <a className=" remove-card"
             onClick={this.deleteCard}>
            Use a Different Card
          </a>
        </div>
      </div>
    )
  }
});

ChargeStripeBtn = React.createClass({
  render: function () {
    return (
      <div className="stripe-charges-btn-div margin-top">
        <div className="col-sm-12">
          <a  className="btn btn-success form-control"
              onClick={this.props.onClick}>
            Charge ${this.props.orderTotal} to Card
          </a>
        </div>
      </div>
    )
  }
});

StripeCustomerBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      user: Meteor.user(),
      stripeCustomer: Session.get("stripeCustomer"),
      orderTotal: StoreApp.currentOrder.getTotal(),
      showForm: false
    }
  },

  deleteCustomer: function () {
    var stripeCustomerId = this.state.stripeCustomer.id;
    Meteor.call("stripeCustomersDelete", Meteor.user())
  },

  handleCharge: function () {
    // console.log("handling charge: " + JSON.stringify(this.state));
    // var card = this.state.payments.stripe.cards.data[0]
    // Meteor.call("stripeChargesCreate", this.state);
  },

  renderCard: function (card, i) {
    return <StripeCustomerCardBlock key={i}
                                    card={card}
                                    stripeCustomer={this.state.stripeCustomer} />
  },

  toggleForm: function () {
    // var toggledForm = !this.state.showForm;
    this.setState({showForm: !this.state.showForm});
  },

  renderCards: function (customerCards) {
    return  (
      <div className="stripe-customer-block col-sm-12">
        <h3 className="form-header">
          Payment:
        </h3>
        <div className="stripe-customer-cards-block col-sm-12">
          {customerCards.map(this.renderCard)}
          <ChargeStripeBtn onClick={this.handleCharge}
                           orderTotal={this.state.orderTotal} />
        </div>
      </div>
    )
  },

  render: function () {
    var stripeCustomer = this.state.stripeCustomer;
    var customerCards = stripeCustomer && stripeCustomer.cards.data;

    if (_.any(customerCards)) {
      return this.renderCards(customerCards);
    } else {
      return <StripeCardForm />
    }
  }
});
