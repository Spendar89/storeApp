/**
 * @jsx React.DOM
 */

ProductImagesBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var product = this.props.product || Session.get("product");
    var imageIds = product && product.imageIds;
    return {
      images: imageIds && ProductImages.find({_id: {$in: imageIds}}).fetch()
    };
  },

  getUrl: function (imgObj) {
    return imgObj && imgObj.url && imgObj.url();
  },

  makePrimaryUrl: function (url) {
    console.log(url);
    this.setState({primaryUrl: url});
  },

  renderThumbnail: function (image, i) {
    var url = this.getUrl(image);
    var handleClick = this.makePrimaryUrl.bind(this,url);
    return (
      <a onClick={handleClick} key={i} className="other-image col-sm-2">
        <img src={url} className="fit-height"/>
      </a>
    )
  },

  renderPrimaryImage: function () {
    var primaryUrl = this.state.primaryUrl || this.getUrl(this.state.images[0]);
    return (
            <div className="primary-image-div">
              <div className="primary-image row">
                <img src={primaryUrl} className="img primary col-sm-10"/>
              </div>
              <div className="other-images-div row">
                {_.map(this.state.images, this.renderThumbnail.bind(this))}
              </div>
            </div>
            )
  },

  renderSingleImage: function () {
    var image = ProductImages.findOne(this.props.imageId);
    var url = this.getUrl(image);
    if (url) {
      return <img src={url} className={this.props.className} />
    } else {
      return <div></div>;
    }

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
    if (this.props.imageId) {
      return this.renderSingleImage();
    } else if (this.props.imageIndex) {
      return this.renderIndexImage();
    } else if (this.state.images[0]) {
      return this.renderPrimaryImage();
    } else {
      return <div> No Image </div>
    }
  }
})