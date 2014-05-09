/**
 * @jsx React.DOM
 */

CartCheckoutBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var cart = Session.get("cart");
    return {
      cart: cart
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
            <h2><a href={"/products/" + product._id}>{product.name}</a></h2>
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

  renderCartProducts: function (cart, cartProducts) {
    var subtotal = cart.subtotal || Carts.getSubtotal(cart);
    return (
      <ul className="cart-products-list col-sm-8 col-sm-offset-2">
        {cartProducts.map(this.renderCartProduct)}
        <li className="cart-product list-item col-sm-12">
          <h2 className="form-header col-sm-12"> Subtotal: ${subtotal}</h2>
        </li>
      </ul>
    )
  },

  renderCartOrderForm: function () {
    return <CartCheckoutForm cart={this.state.cart} className="col-sm-12"/>
  },

  render: function () {
    var cart = this.state.cart;
    var cartProducts = cart && cart.cartProducts;
    var header = cart && cart.active ? 'Your Cart' : 'Thank You For Your Order'
    if (cartProducts && cartProducts.length > 0) {
      return (
        <div className="checkout-block">
          <div className="cart-products-div">
            <h1 className="centered">{header}</h1>
            {this.renderCartProducts(cart, cartProducts)}
          </div>
          <div className="col-sm-12 order-form-div">
            <div className="col-sm-8 col-sm-offset-2">
              {this.renderCartOrderForm()}
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
