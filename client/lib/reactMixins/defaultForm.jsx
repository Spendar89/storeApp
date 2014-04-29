/**
 * @jsx React.DOM
 */

DefaultFormMixin = {
  mixins: [ React.addons.LinkedStateMixin],

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

  renderInputs: function (keys) {
    return (
      <div className="address-inputs">
        <h3 className="form-header">
          {this.props.header}
        </h3>
        {keys.map(this.renderInput)}
      </div>
    )
  },

  render: function () {
    return (
      <div className={this.props.className || "default-form-div"}>
        <form className="default-form form-horizontal"
              role="form">
          {this.renderInputs(this.props.keys)}
        </form>
      </div>
    )
  }
};

