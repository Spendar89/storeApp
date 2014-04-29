/**
 * @jsx React.DOM
 */

  // ProductPropertyRule = {
  //   name: "",
  //   kind: "",
  //   allowedValues: ""
  // }

ProductPropertyRuleInput = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return this.props.productPropertyRule;
  },

  addAllowedValue: function () {
    var ruleCopy = _.extend({},this.state);
    var valuesCopy = ruleCopy.allowedValues.concat([""]);
    this.handleAllowedValues(valuesCopy);
  },

  handleAllowedValues: function (newAllowedValues) {
    this.setState({allowedValues: newAllowedValues});
  },

  componentDidUpdate: function () {
    this.props.handleChange(this.props.key, this.state);
  },

  renderNameInput: function (productPropertyRule) {
    return (
      <div className="form-group rule-inputs">
        <div className="col-sm-12">
        <label className="control-label col-sm-3">
          Name
        </label>
        <div className="col-sm-9">
          <input  required
                  className="form-control"
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
            <select className="form-control"
                    valueLink={this.linkState('kind')}>
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
              <a  className="btn btn-white form-control"
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
    var backgroundClass = this.props.key % 2 === 0 ? "even" : "odd";
    return (
      <div className={"product-property-rule-input-div form-section margin-bottom " + backgroundClass} >
        {this.renderNameInput()}
        {this.renderPropertyKindInput()}
        {this.renderAllowedValueInputs()}
      </div>
    )
  }
});


