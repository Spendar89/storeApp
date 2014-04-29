/**
 * @jsx React.DOM
 */

CartConfirmationBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      cart: Carts.findOne(Session.get("cartId"))
    };
  },


  render: function () {
    return (
      <div className="cart-confirmation-block">
      <h1> C0nfirmation </h1>
      </div>
    )
  }
});
