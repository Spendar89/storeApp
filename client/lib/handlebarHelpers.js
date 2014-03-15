Handlebars.registerHelper('capitalize', function (options) {
  return options.fn(this).replace(/^./, function (char) {
    return char.toUpperCase();
  });
});

Handlebars.registerHelper('imageUrl', function (imageId) {
  var image = ProductImages.findOne(imageId);
  if (image && image.fileHandler) {
    return image.fileHandler.
    default.url;
  }
});

Handlebars.registerHelper('doc', function (key) {
  return window[key];
});

Handlebars.registerHelper('session', function (key) {
  return Session.get(key);
});