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
    var cartCopy = _.extend({}, this.state.cart)
    cartCopy.cartProducts.splice(index, 1);
    Meteor.call("cartsUpsert", cartCopy);
  },

  renderCartProductBlock: function (cartProduct, i) {
    var that = this;
    var removeCartProduct = function () {
      that.removeCartProduct(i);
    };
    return (
      <div className="col-sm-2 row">
        <CartProductBlock handleClick={removeCartProduct}
                          cartProduct={cartProduct}
                          key={i} />
      </div>
    )
  },

  render: function () {
    return (
      <div className="cart-block-div">
        <div className="col-sm-12">
          <div className="row">
            {this.state.cart.cartProducts.map(this.renderCartProductBlock)}
          </div>
        </div>
      </div>
    )
  }
});