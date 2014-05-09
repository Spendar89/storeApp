/**
 * @jsx React.DOM
 */

CartManager = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var cart = Session.get("cart") || Session.get("newCart");
    return {
      cart: cart,
      allCarts: Carts.find().fetch()
    };
  },

  renderCart: function (cart) {
    return <CartBlock cart={cart} key={cart._id}/>
  },

  render: function () {
    if (_.any(this.state.allCarts)) {
      var content =  _.map(this.state.allCarts, this.renderCart);
    } else {
      var content = this.renderCart(this.state.cart);
    }
    return  <div className="cart-manager-div">{content}</div>
  }
});