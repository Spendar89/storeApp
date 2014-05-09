/**
 * @jsx React.DOM
 */

CartAddressForm = React.createClass({
  mixins: [ReactMeteor.Mixin, DefaultFormMixin],

  getMeteorState: function () {
    return Session.get("cart").address;
  },

  componentDidUpdate: function () {
    var cart = _.extend({}, this.state);
    cart.address = this.state;
    Meteor.call("cartsUpsert", cart);

    // syncs to user if set to true...
    if (this.props.syncUser) {
      StoreApp.currentUser.set("address", this.state);
      StoreApp.currentUser.save();
    }
  }

  // componentWillUpdate: function (nextProps, nextState) {
  //   var order = _.extend({}, Session.get("order"));
  //   order.address = nextState;
  //   Meteor.call("ordersUpsert", order);
  // }
});