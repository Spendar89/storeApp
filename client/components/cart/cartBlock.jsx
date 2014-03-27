/**
 * @jsx React.DOM
 */

CartBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var cart = Carts.findOne(Session.get("cartId"));
    var newCart = Session.get("newCart");
    return {
      cart: cart || newCart
    };
  },

  removeCartProduct: function (index) {
    var cartCopy = _.extend({}, this.state.cart);
    cartCopy.cartProducts.splice(index, 1);
    Meteor.call("cartsUpsert", cartCopy);
  },

  renderCartProductBlock: function (cartProduct, i) {
    var that = this;
    var removeCartProduct = function () {
      that.removeCartProduct(i);
    };
    var getClassCols = function () {
      var numberProducts = that.state.cart.cartProducts.length;
      return "col-sm-" + parseInt(12 / numberProducts);
    };
    return (
      <div className={getClassCols()} key={i}>
        <CartProductBlock handleClick={removeCartProduct}
                          cartProduct={cartProduct}
                          key={i} />
      </div>
    )
  },

  render: function () {
    return (
      <div className="cart-block-div">
        <div className="cart-products-div col-sm-9">
          {this.state.cart.cartProducts.map(this.renderCartProductBlock)}
        </div>
        <div className="cart-summary-div col-sm-3">
          <h1> Subtotal: ${this.state.cart.subtotal}</h1>
        </div>
      </div>
    )
  }
});