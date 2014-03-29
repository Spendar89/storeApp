/**
 * @jsx React.DOM
 */

CartBlock = React.createClass({

  removeCartProduct: function (index) {
    var cartCopy = _.extend({}, this.props.cart);
    cartCopy.cartProducts.splice(index, 1);
    Meteor.call("cartsUpsert", cartCopy);
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
    Meteor.call("cartsRemove", this.props.cart);
  },

  render: function () {
    return (
      <div className="cart-block-div open">
        <div className="cart-products-div col-sm-7">
          {this.props.cart.cartProducts.map(this.renderCartProductBlock)}
        </div>
        <div className="cart-summary-div col-sm-3">
          <CartSummaryBlock subtotal={this.props.cart.subtotal}
                            handleRemove={this.handleRemove}/>
        </div>
        <div className="cart-friends-div col-sm-2">
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

          <a className="removeCart btn col-sm-12 btn-danger" onClick={this.props.handleRemove}>
            <h2>Empty Cart</h2>
          </a>

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


