/**
 * @jsx React.DOM
 */

CartProductBlock = React.createClass({

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
          <h1 className="product-price">${product.price}</h1>
        </div>
      </div>
    )
  }
});