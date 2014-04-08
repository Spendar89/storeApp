/**
 * @jsx React.DOM
 */

CartBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      cartIsOpen: Session.get("cartIsOpen")
    }
  },

  removeCartProduct: function (index) {
    var cartCopy = _.extend({}, this.props.cart);
    cartCopy.cartProducts.splice(index, 1);
    Meteor.call("cartsUpsert", cartCopy);
  },

  onClick: function () {
    alert("yoooo")
  },

  renderCartProductBlock: function (cartProduct, i) {
    var that = this;
    var removeCartProduct = function () {
      that.removeCartProduct(i);
    };
    var getClassCols = function () {
      var numberProducts = that.props.cart.cartProducts.length;
      return "col-sm-" + parseInt(12 / numberProducts);
    };
    return (
      <div className={getClassCols()} key={i}>
        <CartProductBlock handleClick={removeCartProduct}
                          cartProduct={cartProduct}
                          key={i} />
      </div>
    )
  },

  handleRemove: function () {
    window.cartyo = this.props.cart;
    Meteor.call("cartsRemove", this.props.cart);
  },

  render: function () {
    var checkoutPath = "/carts/" + this.props.cart._id + "/checkout";
    var className;

    if (this.state.cartIsOpen) {
      className = "cart-block-div open"
    } else {
      className = "cart-block-div"
    }

    return (
      <div className={className} id="#cartBlock">
        <div className="cart-products-div cart-section col-sm-7">
          {this.props.cart.cartProducts.map(this.renderCartProductBlock)}
        </div>
        <div className="cart-summary-div cart-section col-sm-5">
          <CartSummaryBlock subtotal={this.props.cart.subtotal}
                            handleRemove={this.handleRemove}
                            checkoutPath={checkoutPath}/>
        </div>
        <div style={{display:'none'}} className="cart-friends-div col-sm-2">
          <CartFriendsBlock/>
        </div>
      </div>
    )
  }
});

CartSummaryBlock = React.createClass({
  render: function () {
    return (
      <div className="cart-summary-block">

          <h2 className="cart-subtotal col-sm-12"> Subtotal: ${this.props.subtotal}</h2>

          <h5 className="remove-cart-div col-sm-12">
            <a className="btn btn-danger form-control"
               onClick={this.props.handleRemove}>
              Empty Cart
            </a>
          </h5>
          <h5 className="checkout-div col-sm-12">
            <a className="btn btn-success form-control"
               href={this.props.checkoutPath}>
              Checkout
            </a>
          </h5>

      </div>
    )

  }
})

CartFriendsBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      friends: Session.get("friends") || []
    };
  },

  renderFriend: function (friend, i) {
    return <h3>{friend.emails[0].address}</h3>
  },

  render: function () {
    return (
      <div className="cart-friends-block">
       <h2 className="cart-friends-header"> Friends: </h2>
       {this.state.friends.map(this.renderFriend)}
      </div>
    )

  }
})

ShowCartBtn = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      cartIsOpen: Session.get("cartIsOpen")
    }
  },

  handleClick: function () {
    if (this.state.cartIsOpen) {
      Session.set("cartIsOpen", false);
    } else {
      Session.set("cartIsOpen", true);
    }
  },

  render: function () {
    var active = this.state.cartIsOpen ? "active" : null;
    var className = "show-cart-btn nav-btn " + active;
    return (
      <a className={className} onClick={this.handleClick}>Cart</a>
    )

  }
})


