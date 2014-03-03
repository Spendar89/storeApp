Deps.autorun(function () {
  // currentProductGroups = ProductGroups.find({}).fetch();
  var user = Meteor.user();
  var store = Stores.findOne();

  if (user) {
    currentUser = user;
    Session.set("currentUser", user);
    Session.set("currentUserId", user._id);
  }
  if (store) {
    Session.set('currentStore', store);
    currentStore = new LiveDoc(store);
    Session.set('currentStoreId', store._id);
  }

  // Session.set('currentProductGroups', productGroups);


});

  // currentProductGroup = _.extend(new LiveDoc(), {
  //   getRules: function () {
  //     this.dep.depend();
  //     return this.productPropertyRules;
  //   },
  //   addRule: function () {
  //     var newRules = this.productPropertyRules;
  //     newRules.push({});
  //     this.productPropertyRules = newRules;
  //     this.dep.changed(); //invalidates all dependent computations
  //     return this.productPropertyRules;
  //   },
  //   productPropertyRulesIndexed: function () {
  //     this.dep.depend();
  //     return _.map(this.productPropertyRules, function (rule, i) {
  //       rule.index = i;
  //       return rule;
  //     });
  //   }
  // });

  //  bonusMode = {
  //   mode: 'none',
  //   dep: new Deps.Dependency,   //save dependent computations here
  //   get: function () {
  //     this.dep.depend();  //saves the Deps.currentComputation
  //     return this.mode;
  //   },
  //   set: function (newValue){
  //     this.mode = newValue;
  //     this.dep.changed();  //invalidates all dependent computations
  //     return this.mode;
  //   }
  // };

  // currentStore = _.extend(new LiveObj('currentStore', Stores), {

  // });

  // currentProductGroups.set(productGroups);


// });