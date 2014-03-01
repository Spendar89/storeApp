currentProductGroup = function () {
  return Session.get('currentProductGroup');
};

currentProductPropertyRules = function () {
  if (currentProductGroup()) {
    return ProductPropertyRules.find({
      productGroupId: currentProductGroup()._id
    }).fetch();
  }
};

currentFormAction = function () {
  return Session.get('currentFormAction');
};

incrementProductGroupStep = function () {
  var prevStep = Session.get('currentProductGroupStep') || 1;
  Session.set('currentProductGroupStep', prevStep + 1);
};