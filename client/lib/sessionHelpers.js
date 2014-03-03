currentFormAction = function () {
  return Session.get('currentFormAction');
};

incrementProductGroupStep = function () {
  var prevStep = Session.get('currentProductGroupStep') || 1;
  Session.set('currentProductGroupStep', prevStep + 1);
};