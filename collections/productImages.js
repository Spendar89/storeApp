ProductImages = new CollectionFS('productImages', {
  autopublish: false
});

Helpers.addPermissions(ProductImages);

ProductImages.filter({
  allow: {
    contentTypes: ['image/*']
  }
});

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