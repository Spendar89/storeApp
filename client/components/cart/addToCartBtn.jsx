/**
 * @jsx React.DOM
 */

AddToCartBtn = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
   return {
    cart: Carts.findOne(Session.get("cartId")) || Session.get("newCart")
   }
  },

  handleClick: function () {
    var cartCopy = _.extend({}, this.state.cart);
    cartCopy.cartProducts.push(this.props.cartProduct);
    this.saveCart(cartCopy);
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
    return (
      <div className="product-cart-button-div">
        <div className="row">
          <div className="col-sm-12">
            <a  className="btn btn-success form-control"
                onClick={this.handleClick}>
              Add To Cart
            </a>
          </div>
        </div>
      </div>
    )
  }
});