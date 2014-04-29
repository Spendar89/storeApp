/**
 * @jsx React.DOM
 */

OrderAddressForm = React.createClass({
  mixins: [ReactMeteor.Mixin, DefaultFormMixin],

  getMeteorState: function () {
    var address;
    if (this.props.fromUser) {
      address = StoreApp.currentUser.data.address;
    } else {
      address = Session.get("order").address;
    }
    return address;
  },

  componentDidUpdate: function () {
    if (this.props.fromUser) {
      StoreApp.currentUser.set("address", this.state);
      StoreApp.currentUser.save();
    }
  },

  componentWillUpdate: function (nextProps, nextState) {
    var order = _.extend({}, Session.get("order"));
    order.address = nextState;
    Meteor.call("ordersUpsert", order);
  }
});