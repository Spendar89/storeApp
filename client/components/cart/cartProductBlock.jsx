/**
 * @jsx React.DOM
 */

CartProductBlock = React.createClass({
  renderOption: function (optionValue, optionKey) {
    return <CartProductOption value={optionValue} key={optionKey}/>
  },

  render: function () {
    var cartProduct = this.props.cartProduct;
    var product = Products.findOne(cartProduct.productId);
    var imageUrl = Products.getImageUrls(product)[0];
    var backgroundImage = {
      "background": "white url("+imageUrl+") 50% 75% no-repeat",
      "background-size": "contain"
    }
    return (
      <div className="cart-product-block-div" style={backgroundImage}>
        <a  className="remove-x"
            onClick={this.props.handleClick}>
          X
        </a>
        <div className="name-price-div">
          <h1 className="product-name">{product.name}</h1>
          <h1 className="product-price">${product.price}</h1>
        </div>
        <div className="cart-product-options-div">
          {_.map(cartProduct.options, this.renderOption)}
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