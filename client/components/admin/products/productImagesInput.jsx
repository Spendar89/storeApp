/**
 * @jsx React.DOM
 */

ProductImagesInput = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      imageIds: this.props.imageIds || []
    };
  },

  componentDidUpdate: function () {
    this.props.handleUpdate(this.state.imageIds);
  },

  handleChange: function (e) {
    var that = this;
    FS.Utility.eachFile(e, function (file) {
      var newFile = new FS.File(file);
      newFile.attachData(file);

      ProductImages.insert(newFile, function (err, productImage) {
        var newImageIds = that.state.imageIds.concat([productImage._id]);
        that.setState({imageIds: newImageIds});
      });

    })
  },

  handleReset: function (e) {
    this.setState({imageIds: []})
  },

  renderImagePreview: function (imageId, i) {
    return <ProductImagesBlock key={i}
                               imageId={imageId}
                               className="col-sm-3"/>
  },

  render: function () {
    return (
      <div className="product-images-input-div">
        <div className="col-sm-12">
          {this.state.imageIds.map(this.renderImagePreview)}
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">
            Image:
          </label>
          <div className="col-sm-9">
            <input  type="file"
                    className="fileUploader"
                    onChange={this.handleChange}/>
          </div>
          <div className="col-sm-12">
            <div className="col-sm-12">
              <a className="btn btn-danger form-control"
                 onClick={this.handleReset}>
                Reset
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
});