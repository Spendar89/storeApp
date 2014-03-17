/**
 * @jsx React.DOM
 */

ProductImagesBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var product = Session.get("product");
    return {
      images: ProductImages.find({_id: {$in: product.imageIds}}).fetch()
    };
  },

  getUrl: function (imgObj) {
    return imgObj.fileHandler.default.url;
  },

  renderPrimaryImage: function () {
    var url = this.getUrl(this.state.images[0]);
    return (
            <div className="primary-image-div row">
              <img src={url} className="img primary col-sm-10"/>
            </div>
            )
  },

  render: function () {
    if (this.state.images[0]) {
      return this.renderPrimaryImage();
    } else {
      return <div>No Image</div>
    }
  }
})