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
    var valuesCopy = this.state.allowedValues.concat([""]);
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
        <label className="control-label col-sm-3">
          Name
        </label>
        <div className="col-sm-9">
          <input  required className="form-control"
                  valueLink={this.linkState('name')}/>
        </div>
        </div>
      </div>
    )
  },

  renderPropertyKindInput: function () {
    return <div className="form-group rule-inputs">
        <div className="col-sm-12">
          <label className="control-label col-sm-3">
            Kind
          </label>
          <div className="col-sm-9">
            <select className="form-control" valueLink={this.linkState('kind')}>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="product">Product</option>
              <option value="option">Option</option>
            </select>
          </div>
        </div>
    </div>
  },

  renderAllowedValueInputs: function () {
    return (
      <div>

        <div className="form-group input-div">
          <div className="col-sm-12">
            <label className="control-label col-sm-3">
              Allowed
            </label>
            <div className="col-sm-9 pull-right">
                    <AllowedValueInputs allowedValues={this.state.allowedValues}
                            handleChange={this.handleAllowedValues}/>
              <a  className="btn btn-primary form-control"
                  onClick={this.addAllowedValue}>
                New Allowed Value
              </a>
            </div>
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


