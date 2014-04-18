/**
 * @jsx React.DOM
 */

BlockRow = React.createClass({
  render: function () {
    var _id = this.props.key;
    var label = this.props.doc.name || _id;
    var showPath = this.props.showPath;

    return (
      <li className={this.props.classString + '-' + _id}>
        <div className={"col-sm-12 " + this.props.classString + "-row"
          + " editing-" + this.props.currentlyEditing
          + " last-" + this.props.isLast}>
          <span className="col-sm-7">
          <a href={showPath}>
            <h4>{label}</h4>
          </a>
          </span>
          <span className="col-sm-2">
            <a  className="inline-btn btn btn-info"
                onClick={this.props.handleEdit}>
              Edit
            </a>
          </span>
          <span className="col-sm-2">
            <a  className="inline-btn btn btn-danger"
                onClick={this.props.handleRemove}>
              Remove
            </a>
          </span>
        </div>
      </li>
    );
  }
});

DefaultFormMixin = {

  renderInput: function (key, i) {
    return (
      <div key={i} className="form-group">
        <label className="control-label col-sm-2">
          {Util.unCamel(key)}
        </label>
        <div className="col-sm-10">
          <input className="form-control"
                 placeholder={Util.unCamel(key)}
                 valueLink={this.linkState(key)}/>
        </div>
      </div>
    )
  },

  renderInputs: function () {
    return (
      <div className="address-inputs">
        <h3 className="form-header">
          {this.props.header}
        </h3>
        {this.props.keys.map(this.renderInput)}
      </div>
    )
  }
};

