/**
 * @jsx React.DOM
 */

  // ProductPropertyRule = {
  //   name: "",
  //   kind: "",
  //   allowedValues: ""
  // }

ProductPropertyRuleInput = React.createClass({

  addAllowedValue: function () {
    var ruleCopy = _.extend({},this.props.productPropertyRule);
    var valuesCopy = ruleCopy.allowedValues.concat([""]);
    this.handleAllowedValues(valuesCopy);
  },

  handleAllowedValues: function (newAllowedValues) {
    var ruleCopy = _.extend({},this.props.productPropertyRule);
    ruleCopy.allowedValues = newAllowedValues;
    this.handleChange(ruleCopy);
  },

  handleChange: function (productPropertyRule) {
    this.props.handleChange(this.props.key, productPropertyRule);
  },

  handleKind: function (e) {
    var ruleCopy = _.extend({},this.props.productPropertyRule);
    ruleCopy.kind = e.target.value;
    this.handleChange(ruleCopy);
  },

  handleName: function (e) {
    var ruleCopy = _.extend({},this.props.productPropertyRule);
    ruleCopy.name = e.target.value;
    this.handleChange(ruleCopy);
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
                  value={this.props.productPropertyRule.name}
                  onChange={this.handleName}
                  className="form-control"/>
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
                    value={this.props.productPropertyRule.kind}
                    onChange={this.handleKind}>
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
              <AllowedValueInputs allowedValues={this.props.productPropertyRule.allowedValues}
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


