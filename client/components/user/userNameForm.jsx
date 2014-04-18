/**
 * @jsx React.DOM
 */

UserNameForm = React.createClass({
  mixins: [ ReactMeteor.Mixin, DefaultFormMixin ],

  getMeteorState: function () {
    return StoreApp.currentUser.data;
  },

  componentWillUpdate: function (nextProps, nextState) {
    StoreApp.currentUser.setAll(nextState);
    StoreApp.currentUser.save();
  }
});