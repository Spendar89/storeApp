/**
 * @jsx React.DOM
 */

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
    );
  },

  render: function () {
    return (
      <div>
        <div>
          {this.props.allowedValues.map(this.renderAllowedValue)}
        </div>
      </div>
    );
  }
})