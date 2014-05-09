/**
 * @jsx React.DOM
 */

StripeCustomerBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var cart = Session.get("cart");
    return {
      cartTotal: cart.total || Carts.getSubtotal(cart),
      showForm: false
    };
  },

  deleteCustomer: function () {
    var stripeCustomerId = this.props.stripeCustomer.id;
    Meteor.call("stripeCustomersDelete", this.props.user);
  },

  afterCharge: function (err, res) {
    // TODO: need to figure out how to publish cart
    // without user Id... or figure out how to create
    // user id before charge
    if (res) {
      var cart = _.extend({}, Session.get("cart"));
      cart.active = false;
      Session.set("cart", cart);
    } else if (err) {
      console.log("charge fail.", err);
    }
  },

  handleCharge: function () {
    Meteor.call("stripeChargesCreate", this.state.cartTotal,
      this.props.stripeCustomer.id,
      this.props.cart,
      this.afterCharge
    );
  },

  renderCard: function (card, i) {
    return <StripeCardBlock key={i}
                            card={card}
                            cart={this.props.cart}
                            stripeCustomer={this.props.stripeCustomer} />
  },

  toggleForm: function () {
    // var toggledForm = !this.state.showForm;
    this.setState({showForm: !this.state.showForm});
  },

  renderChargeStripeBtn: function () {
    if (this.props.cart.active) {
      return <StripeCardChargeBtn onClick={this.handleCharge}
                                  cartTotal={this.state.cartTotal} />
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
