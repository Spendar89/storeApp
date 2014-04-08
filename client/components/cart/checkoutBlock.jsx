/**
 * @jsx React.DOM
 */

CheckoutBlock = React.createClass({
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
    });

    var total = (product.price * cartProduct.quantity);

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
            <h2>Total: ${total}</h2>
          </div>
      </li>
    )
  },

  renderCartForm: function (cart, cartProducts) {
    return (
      <ul className="cart-products-list col-sm-8 col-sm-offset-2">
        {cartProducts.map(this.renderCartProduct)}
        <li className="cart-product list-item row">
          <h2 className="form-header"> Subtotal: ${cart.subtotal}</h2>
        </li>
      </ul>
    )
  },

  render: function () {
    var cart = this.state.cart;
    var cartProducts = cart && cart.cartProducts;
    if (cartProducts) {
      return (
        <div className="checkout-block">

          <div className="cart-products-div">
            <h1 className="centered">Your Cart</h1>
            <div className="col-sm-12">
              {this.renderCartForm(cart, cartProducts)}
            </div>
          </div>

          <div className="col-sm-10 col-sm-offset-1 order-form-div">
            <div className="col-sm-12">
              <h1 className="centered">Order Details</h1>
              <OrderForm className="col-sm-8 col-sm-offset-2"/>
            </div>
          </div>

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
