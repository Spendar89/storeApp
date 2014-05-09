/**
 * @jsx React.DOM
 */

CartNameForm = React.createClass({
  mixins: [ ReactMeteor.Mixin, DefaultFormMixin ],

  getMeteorState: function () {
    return Session.get("cart");
  },

  componentWillUpdate: function (nextProps, nextState) {
    Meteor.call("cartsUpsert", nextState);
  }
});