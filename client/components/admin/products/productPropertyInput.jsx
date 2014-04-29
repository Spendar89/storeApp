/**
 * @jsx React.DOM
 */

ProductPropertyInput = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    return this.props.property;
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
        {this.props.productPropertyRule.allowedValues.map(allowedOption)}
      </select>
    )
  },

  renderOpenInput: function () {
    return (
      <input  type={this.props.productPropertyRule.kind}
              className="form-control bordered"
              valueLink={this.linkState('value')}/>
    )
  },

  render: function () {
    var allowedValues = this.props.productPropertyRule.allowedValues;

    if (_.any(allowedValues)) {
      var inputBlock = this.renderAllowedInput();
    } else {
      var inputBlock = this.renderOpenInput();
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