/**
 * @jsx React.DOM
 */

CartManager = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      cart: Carts.findOne(Session.get("cartId")),
      allCarts: Carts.find().fetch()
    };
  },

  renderCart: function (cart) {
    if (cart) {
      return <CartBlock cart={cart} key={cart._id}/>
    }

  },

  render: function () {
    return (
      <div className="cart-manager-div">
        {_.map([this.state.allCarts], this.renderCart)}
      </div>
    )
  }
});