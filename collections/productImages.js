ProductImages = new FS.Collection('productImages', {
  useHTTP: true,
  stores: [new FS.Store.FileSystem('productImages')],
  filter: {
    allow: {
      contentTypes: ['image/*'],
      extensions: ['png', 'jpg', 'jpeg', 'gif']
    }
  }
});

Helpers.addPermissions(ProductImages);

ProductImages.allow({
  download: function () {
    return true;
  }
});

ProductImages.getUrls = function (images) {
  return images.map(function (image) {
    return image.url();
  });
};