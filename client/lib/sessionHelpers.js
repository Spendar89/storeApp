LiveDoc = function (doc) {
  this.dep = new Deps.Dependency;
  this.doc = doc;
};

LiveDoc.prototype = {
  get: function () {
    this.dep.depend();
    return this.doc;
  },
  set: function (doc) {
    this.dep.changed();
    this.doc = doc;
    return this.doc;
  },
  clear: function () {
    this.dep.changed();
    this.doc = null;
    return this.doc;
  }
};

currentFormAction = function () {
  return Session.get('currentFormAction');
};

incrementProductGroupStep = function () {
  var prevStep = Session.get('currentProductGroupStep') || 1;
  Session.set('currentProductGroupStep', prevStep + 1);
};

