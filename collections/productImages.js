ProductImages = new CollectionFS('productImages', {
  autopublish: false
});

Helpers.addPermissions(ProductImages);

ProductImages.filter({
  allow: {
    contentTypes: ['image/*']
  }
});

ProductImages.getUrls = function (images) {
  return images.map(function (image) {
    return image.fileHandler.default.url;
  });
};

if (Meteor.isServer) {

  var handler = {
    'default': function (options) {
      return {
        blob: options.blob,
        fileRecord: options.fileRecord
      };
    }
  };

  ProductImages.fileHandlers(handler);
}