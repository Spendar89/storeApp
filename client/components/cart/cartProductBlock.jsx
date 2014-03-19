/**
 * @jsx React.DOM
 */

CartProductBlock = React.createClass({

  render: function () {
    var cartProduct = this.props.cartProduct;
    var product = Products.findOne(cartProduct.productId);
    var imageUrl = Products.getImageUrls(product)[0];
    var backgroundImage = {
      "background": "url("+imageUrl+") 50% 75%",
      "background-size": "200%"
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