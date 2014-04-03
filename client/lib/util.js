Util = {
  capitalizedString: function (s) {
    return s.replace(/^./, function (c) {
      return c.toUpperCase();
    });
  },

  cleanup: function (obj) {
    return _(obj).reduce(function (a, v, k) {
      if (v) { a[k] = v; }
      return a;
    }, {});
  }


};