ProductImages = new FS.Collection('productImages', {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})],
  autopublish: false,
   filter: {
    allow: {
      contentTypes: ['image/*'],
      extensions: ['png']
    }
  }
});

Helpers.addPermissions(ProductImages);

ProductImages.getUrls = function (images) {
  return images.map(function (image) {
    return image.url
  });
};

// if (Meteor.isServer) {

  // var handler = {
  //   'default': function (options) {
  //     return {
  //       blob: options.blob,
  //       fileRecord: options.fileRecord
  //     };
  //   }
  // };

  // ProductImages.fileHandlers(handler);
// }