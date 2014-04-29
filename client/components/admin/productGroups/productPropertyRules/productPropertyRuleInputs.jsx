/**
 * @jsx React.DOM
 */

// Parent: productGroupForm
// Children: productPropertyRuleInput

ProductPropertyRulesInputs = React.createClass({

  renderProductPropertyRuleInput: function (productPropertyRule, index) {
    return <ProductPropertyRuleInput  productPropertyRule={productPropertyRule}
                                      key={index}
                                      handleChange={this.handleChange}/>
  },

  handleChange: function (index, newRule, removeValue) {
    var rulesCopy = _.extend({}, this.props.productPropertyRules);
    if (rulesCopy[index] && removeValue) {
      rulesCopy.splice(index, 1);
    } else {
      rulesCopy[index] = newRule;
    }
    this.props.handleChange('productPropertyRules', rulesCopy);
  },

  render: function () {
    var productPropertyRules = this.props.productGroup.productPropertyRules;
    return (
      <div className="product-property-rules-form">
        <div className="form-group row input-div">
          <div className="col-sm-12">
            <a className="btn btn-primary form-control margin-top"
               onClick={this.props.handleNew}>
              Add a Product Property Rule
            </a>
          </div>
        </div>
        {_.map(productPropertyRules, this.renderProductPropertyRuleInput)}
      </div>
    )
  }
});