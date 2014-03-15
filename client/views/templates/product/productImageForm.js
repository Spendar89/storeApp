Template.productImageForm.events({
  'change .fileUploader': function (e) {
    var files = e.target.files;
    var fileIds = [];
    // var productImages = [];
    ProductImages.storeFiles(files, {
      productGroupId: productGroup._id
    }, function (file, fileId) {
      fileIds.push(fileId);
      Session.set("currentProductImageIds", fileIds);
    });
  }
});