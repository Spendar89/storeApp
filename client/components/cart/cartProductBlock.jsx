/**
 * @jsx React.DOM
 */

CartProductBlock = React.createClass({
  renderOption: function (optionValue, optionKey) {
    return <CartProductOption value={optionValue} key={optionKey}/>
  },

  render: function () {
    var cartProduct = this.props.cartProduct;
    var product = cartProduct.product;
    var imageUrl = Products.getImageUrls(product)[0];
    var backgroundImage = {
      "background": "white url("+imageUrl+") 50% 75% no-repeat",
      "background-size": "contain"
    }
    var quantityDiv = cartProduct.quantity > 1 ? "X " + cartProduct.quantity : ""
    return (
      <div className="cart-product-block-div" style={backgroundImage}>
        <a  className="remove-x"
            onClick={this.props.handleClick}>
          X
        </a>
        <div className="cart-product-text">
          <h2 className="product-name col-sm-12">{product.name}</h2>
          <h2 className="product-price col-sm-12">${product.price} {quantityDiv}</h2>
          <div className="cart-product-options-div">
            {_.map(cartProduct.options, this.renderOption)}
          </div>
        </div>

      </div>
    )
  }
});

CartProductOption = React.createClass({
  render: function () {
    return (
      <div className="col-sm-12 cart-product-option">
        {this.props.key}: {this.props.value}
      </div>
    )
  }
})