/**
 * @jsx React.DOM
 */

OrderAddressForm = React.createClass({
  mixins: [ReactMeteor.Mixin, DefaultFormMixin],

  getMeteorState: function () {
    return Session.get("order").address;
  },

  componentDidUpdate: function () {
    var order = _.extend({}, Session.get("order"));
    order.address = this.state;
    Meteor.call("ordersUpsert", order);

    // syncs to user if set to true...
    if (this.props.syncUser) {
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