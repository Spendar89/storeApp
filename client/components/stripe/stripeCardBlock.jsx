/**
 * @jsx React.DOM
 */

StripeCardBlock = React.createClass({

  removeCard: function () {
    var stripeCustomer = this.props.stripeCustomer;
    Meteor.call("stripeCustomersDeleteCard", Meteor.user(), this.props.key);
  },

  renderRemoveCartBtn: function () {
    if (this.props.cart.active) {
      return (
        <div className="col-sm-12 remove-card-div">
          <a className=" remove-card"
             onClick={this.removeCard}>
            Use a Different Card
          </a>
        </div>
      )
    }
  },

  render: function () {
    var card = this.props.card;
    var cardNumber = Util.hiddenCard(card.last4);
    return (
      <div className="form-group saved-payment col-sm-12 row margin-bottom">
        <div className="card-number col-sm-12">
          {cardNumber}
        </div>
        {this.renderRemoveCartBtn()}
      </div>
    )
  }
});