/**
 * @jsx React.DOM
 */

AddToCartBtn = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      cart: Carts.findOne(Session.get("cartId")) || Session.get("newCart")
    };
  },

  handleClick: function () {
    var invalidOptions = this.invalidOptions();
    var optionsAreValid = !_.any(invalidOptions)

    if (optionsAreValid) {
      var cartCopy = _.extend({}, this.state.cart);
      var matchingCpIndex = this.matchingCartProductIndex(cartCopy);

      if (matchingCpIndex > -1) {
        var addQty = this.props.cartProduct.quantity;
        cartCopy.cartProducts[matchingCpIndex].quantity += addQty;
      } else {
        cartCopy.cartProducts.push(this.props.cartProduct);
      }
      this.saveCart(cartCopy);
    } else {

      console.log("invalid options: " + invalidOptions);
    }
    this.setState({inValidOptions: invalidOptions});
  },

  invalidOptions: function () {
    var product = this.props.cartProduct.product;
    var optionKeys = Products.getOptionKeys(product);

    return _.filter(optionKeys, function (key, i) {
      return !this.props.cartProduct.options[key];
    }.bind(this));
  },

  matchingCartProductIndex: function (cart) {
    var pickedCartProduct = _.pick(this.props.cartProduct,
                                   ["productId", "options"]);
    var match = _.find(cart.cartProducts, function (cp) {
      var pickedCp = _.pick(cp, ["productId", "options"]);
      return _.isEqual(pickedCartProduct, pickedCp);
    });

    return _.indexOf(cart.cartProducts, match);
  },

  saveCart: function (cartCopy) {
    if (Session.get("currentUser")) {
      Meteor.call("cartsUpsert", cartCopy, this.afterSave);
    } else {
      Session.set("newCart", cartCopy);
    }
  },

  afterSave: function (error, success) {
    if (success) {
      // do something if saved
    } else {
      console.log("whoops didn't save");
    }
  },

  render: function () {
    var isInvalid = _.any(this.state.inValidOptions)
    var validationText = isInvalid ? "Not Added" : "Added"
    var buttonClass = isInvalid ? "btn-danger" : "btn-success";
    var className = "btn form-control " + buttonClass;
    return (
      <div className="product-cart-button-div">
        <div className="row">
          <div className="col-sm-12">
            <a  className={className}
                onClick={this.handleClick}>
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    )
  }
});