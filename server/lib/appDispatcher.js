var _callback = {};

var Dispatcher = function () {};

Dispatcher.prototype = {
  _callbacks: {},

  register: function (key, callbacks) {
    this._callbacks[key] = callbacks;
  },

  dispatch: function (key, actionType, payload) {
    var callback = this._callbacks[key][actionType];
    if (callback) callback(payload);
  }
};

AppDispatcher = new Dispatcher();