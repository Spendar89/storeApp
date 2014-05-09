Meteor.methods({
  handleViewAction: function (action) {
    if (action.simulation) action.simulation();
  }
});
