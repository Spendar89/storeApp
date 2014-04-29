/**
 * @jsx React.DOM
 */

StripeCustomerBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      orderTotal: Session.get("cart").total,
      showForm: false
    }
  },

  deleteCustomer: function () {
    var stripeCustomerId = this.props.stripeCustomer.id;
    Meteor.call("stripeCustomersDelete", this.props.user)
  },

  afterCharge: function (err, res) {
    if (res) {
      console.log("charge success.")
      console.log(res);
    } else {
      console.log("charge fail.")
      console.log(err);
    }

  },

  handleCharge: function () {
    Meteor.call("stripeChargesCreate", this.state.orderTotal,
      this.props.stripeCustomer.id,
      this.props.order._id,
      this.afterCharge
    );
  },

  renderCard: function (card, i) {
    return <StripeCardBlock key={i}
                            card={card}
                            order={this.props.order}
                            stripeCustomer={this.props.stripeCustomer} />
  },

  toggleForm: function () {
    // var toggledForm = !this.state.showForm;
    this.setState({showForm: !this.state.showForm});
  },

  renderChargeStripeBtn: function () {
    if (this.props.order.active) {
      return <StripeCardChargeBtn onClick={this.handleCharge}
                                  orderTotal={this.state.orderTotal} />
    }

  },

  renderCards: function (customerCards) {
    return  (
      <div className="stripe-customer-block">
        <h3 className="form-header">
          Payment:
        </h3>
        <div className="stripe-customer-cards-block row">
          {customerCards.map(this.renderCard)}
          {this.renderChargeStripeBtn()}
        </div>
      </div>
    )
  },

  render: function () {
    var stripeCustomer = this.props.stripeCustomer;
    var customerCards = stripeCustomer && stripeCustomer.cards.data;

    if (_.any(customerCards)) {
      return this.renderCards(customerCards);
    } else {
      return <StripeCardForm />
    }
  }
});
