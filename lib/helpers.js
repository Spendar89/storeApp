Helpers = {};

Helpers.addPermissions = function (collection) {
  collection.allow({
    remove: function () {
      return true;
    },
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    }
  });
};

Helpers.addNewProductRule = function () {
  var currentRules = Session.get("currentProductPropertyRules") || [];
  var newRule = {
    name: "",
    allowedType: "String"
  };
  currentRules.push(newRule);
  console.log(currentRules);
  Session.set("currentProductPropertyRules", currentRules);
  // currentRules.push(newRule);
  // Session.set("currentProductPropertyRules", currentRules);
};


// Handlebars.registerHelper("foo", function() {
//   return "blah"; // (calculate value here)
// });