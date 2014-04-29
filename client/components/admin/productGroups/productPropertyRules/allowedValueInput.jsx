/**
 * @jsx React.DOM
 */

AllowedValueInput = React.createClass({

  handleChange: function (event) {
    this.props.handleChange(this.props.key, event.target.value);
  },

  removeValue: function (event) {
    this.props.handleChange(this.props.key, undefined, true);
  },

  render: function () {
    return (
      <div className="form-group allowed-value-inputs">
        <div className="col-sm-8">
          <input  required value={this.props.value} className="form-control"
                  onChange={this.handleChange}/>
        </div>
        <div className="col-sm-4">
          <a className="btn btn-danger form-control" onClick={this.removeValue}> Remove </a>
        </div>
      </div>
    )
  }

});