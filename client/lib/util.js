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
  },

  repeatChar: function (n, uni) {
    var s = "";
    _.times(n, function () {
      s += String.fromCharCode(uni);
    });
    return s;
  },

  hiddenCard: function (lastFour) {
    var g = this.repeatChar(4, 9679) + " ";
    return g + g + g + lastFour;
  },

  // camelCase --> Camel Case
  unCamel: function (s) {
    return s.replace(/([A-Z])/g, ' $1')
      .replace(/^./, function (str) {
        return str.toUpperCase();
      });
  },

  // returns true if each filter term is found in string
  matchesTextFilter: function (str, filt) {
    return _.isEmpty(_.reject(filt.toLowerCase().split(" "), function (f) {
      return str.toLowerCase().match(f);
    }));
  }

};