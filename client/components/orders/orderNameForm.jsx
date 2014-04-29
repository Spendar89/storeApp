/**
 * @jsx React.DOM
 */

OrderNameForm = React.createClass({
  mixins: [ ReactMeteor.Mixin, DefaultFormMixin ],

  getMeteorState: function () {
    return Session.get("order");
  },

  componentWillUpdate: function (nextProps, nextState) {
    Meteor.call("ordersUpsert", nextState);
  }
});