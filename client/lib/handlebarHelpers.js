Handlebars.registerHelper('capitalize', function (options) {
  return options.fn(this).replace(/^./, function (char) {
    return char.toUpperCase();
  });
});