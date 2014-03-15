/**
 * @jsx React.DOM
 */

AllowedValueInput = React.createClass({

  handleChange: function (event) {
    this.props.handleChange(this.props.key, event.target.value)
  },

  render: function () {
    return (
      <div className="form-group allowed-value-inputs">
        <div className="col-sm-12">
          <input  required value={this.props.value} className="form-control"
                  onChange={this.handleChange}/>
        </div>
      </div>
    )
  }

})

AllowedValueInputs = React.createClass({

  handleChange: function (index, value) {
    var allowedValuesCopy = [].concat(this.props.allowedValues);
    allowedValuesCopy[index] = value;
    this.props.handleChange(allowedValuesCopy);
  },

  renderAllowedValue: function (value, i) {
    return (
      <AllowedValueInput  required key={i}
                          value={value}
                          handleChange={this.handleChange}/>
    )
  },

  render: function () {
    return (
      <div>
        <label className="control-label">
          Property Rule Allowed Values
        </label>
        {this.props.allowedValues.map(this.renderAllowedValue)}
      </div>
    )
  }
})