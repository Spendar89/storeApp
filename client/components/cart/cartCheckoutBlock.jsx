/**
 * @jsx React.DOM
 */

CartCheckoutBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      cart: Carts.findOne(Session.get("cartId"))
    };
  },

  renderCartProduct: function (cartProduct, i) {
    var product = cartProduct.product
    var images = product.imageIds.map(function (imageId) {
      return <ProductImagesBlock key={i}
                                 imageId={imageId}
                                 className="col-sm-12"/>
    })

    return (
      <li className="cart-product list-item row"
          key={i}>
          <div className="col-sm-2 product-img">
            {images[0]}
          </div>
          <div className="col-sm-5 product-info">
            <h2>{product.name}</h2>
          </div>
          <div className="col-sm-2 product-qty">
            <h2>Qty: {cartProduct.quantity}</h2>
          </div>
          <div className="col-sm-3 cart-product-total">
            <h2>Total: ${cartProduct.product.price * cartProduct.quantity}</h2>
          </div>
      </li>
    )
  },

  renderCartForm: function (cart, cartProducts) {
    return (
      <ul className="cart-products-list col-sm-8 col-sm-offset-2">
        {cartProducts.map(this.renderCartProduct)}
        <li className="cart-product list-item row">
          <h1> Subtotal: ${cart.subtotal}</h1>
        </li>
      </ul>
    )
  },

  renderUserForm: function () {
    return (
      <ul className="user-form col-sm-8 col-sm-offset-2">
        <h2> User Information </h2>
      </ul>
     )
  },

  render: function () {
    var cart = this.state.cart;
    var cartProducts = cart && cart.cartProducts;
    if (cartProducts) {
      return (
        <div className="cart-checkout-block">
          <h1 className="centered">Checkout</h1>
          {this.renderCartForm(cart, cartProducts)}
          {this.renderUserForm()}
        </div>
      )
    } else {
      return (
        <div className="no-cart-div">
          <h1 className="centered">Cart is Empty</h1>
        </div>
      )
    }
  }
});
