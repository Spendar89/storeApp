/**
 * @jsx React.DOM
 */

RuleInputs = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    var rule = this.props.productPropertyRule;
    return {
      name: rule.name,
      kind: rule.kind,
      allowedValues: rule.allowedValues
    };
  },

  addAllowedValue: function () {
    var valuesCopy = this.state.allowedValues.concat([""])
    this.setState({allowedValues: valuesCopy});
  },

  handleAllowedValues: function (newAllowedValues) {
    this.setState({allowedValues: newAllowedValues});
  },

  componentDidUpdate: function () {
    this.props.handleUpdate(this.props.key, this.state);
  },

  renderProperyNameInput: function () {
    return (
      <div className="form-group rule-inputs">
        <div className="col-sm-12">
        <label className="control-label">
          Property Name
        </label>
        <input  required className="form-control"
                valueLink={this.linkState('name')}/>
        </div>
      </div>
    )
  },

  renderPropertyKindInput: function () {
    return <div className="form-group rule-inputs">
        <div className="col-sm-12">
          <label className="control-label">
            Property Kind
          </label>
          <select className="form-control" valueLink={this.linkState('kind')}>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="product">Product</option>
          </select>
        </div>
    </div>
  },

  renderAllowedValueInputs: function () {
    return (
      <div>
        <AllowedValueInputs allowedValues={this.state.allowedValues}
                            handleChange={this.handleAllowedValues}/>
        <div className="form-group row input-div">
          <div className="col-sm-12">
            <a  className="btn btn-default form-control"
                onClick={this.addAllowedValue}>
              Add Allowed Value
            </a>
          </div>
        </div>
      </div>
    )
  },

  render: function () {
    return (
      <div className="input-div rule-div">
        {this.renderProperyNameInput()}
        {this.renderPropertyKindInput()}
        {this.renderAllowedValueInputs()}
      </div>
    )
  }
});


