/**
 * @jsx React.DOM
 */

UserAddressForm = React.createClass({
  mixins: [ReactMeteor.Mixin, DefaultFormMixin],

  getMeteorState: function () {
    return StoreApp.currentUser.data.address;
  },

  componentWillUpdate: function (nextProps, nextState) {
    // keep initial state as user address but change
    // default behavior to only save  to user if checkbox
    // is checked... otherwise set address property on only
    // order (as opposed to both)
    StoreApp.currentUser.set("address", nextState);
    StoreApp.currentUser.save();
  }
});