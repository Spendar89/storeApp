/**
 * @jsx React.DOM
 */

AllowedValueInput = React.createClass({

  handleChange: function (event) {
    this.props.handleChange(this.props.key, event.target.value)
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

})

AllowedValueInputs = React.createClass({

  handleChange: function (index, value, removeValue) {
    var allowedValuesCopy = [].concat(this.props.allowedValues);
    if(allowedValuesCopy[index] && removeValue === true) {
      allowedValuesCopy.splice(index, 1);
    } else {
      allowedValuesCopy[index] = value;
    }
    this.props.handleChange(allowedValuesCopy);
  },

  renderAllowedValue: function (value, i) {
    return (
      <AllowedValueInput  key={i}
                          value={value}
                          handleChange={this.handleChange}/>
    )
  },

  render: function () {
    return (
      <div>
        <div>
          {this.props.allowedValues.map(this.renderAllowedValue)}
        </div>
      </div>
    )
  }
})