/**
 * @jsx React.DOM
 */

ProductImagesBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var product = this.props.product || Session.get("product");
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

  renderIndexImage: function () {
    var index = this.props.imageIndex;
    var url = this.getUrl(this.state.images[index]);
    var className = this.props.className;
    var style = {background: "url("+url+")"}
    return (
      <div src={url} className={className} style={style}></div>
    )
  },

  render: function () {
    if(this.props.imageIndex) {
      return this.renderIndexImage();
    } else if (this.state.images[0]) {
      return this.renderPrimaryImage();
    } else {
      return <div>No Image</div>
    }
  }
})