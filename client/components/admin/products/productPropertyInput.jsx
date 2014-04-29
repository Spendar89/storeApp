/**
 * @jsx React.DOM
 */

ProductPropertyInput = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    return _.extend({}, this.props.property);
  },

  componentDidUpdate: function () {
    this.props.handleUpdate(this.state);
  },

  renderAllowedInput: function () {
    var allowedOption = function (allowedValue, i) {
      return (
        <option key={i}
                value={allowedValue}>
          {allowedValue}
        </option>
      )
    };
    return (
      <select className="form-control bordered"
              valueLink={this.linkState('value')}>
        {this.props.propertyRule.allowedValues.map(allowedOption)}
      </select>
    )
  },

  renderOpenInput: function () {
    return (
      <input  type={this.props.propertyRule.kind}
              className="form-control bordered"
              valueLink={this.linkState('value')}/>
    )
  },

  render: function () {
    var inputBlock;
    var allowedValues = this.props.allowedValues;

    if (allowedValues && allowedValues.length > 0 && allowedValues[0].length > 0) {
      inputBlock = this.renderAllowedInput();
    } else {
      inputBlock = this.renderOpenInput();
    }

    return (
      <div className="product-property-input-div">
        <div className="form-group">
          <label className="col-sm-3 control-label">
            {this.state.name}
          </label>
          <div className="col-sm-9">
            {inputBlock}
          </div>
        </div>
      </div>
    )
  }

});