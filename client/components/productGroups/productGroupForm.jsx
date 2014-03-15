/**
 * @jsx React.DOM
 */

ProductGroupForm = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var editProductGroup = ProductGroups.findOne(Session.get("editProductGroupId"));
    var productGroup = editProductGroup || Session.get("newProductGroup");;
    return {
      productGroup: productGroup,
      isEditing: productGroup._id ? true : false,
      error: false
    };
  },

  // ** Rule Input Code **

  renderRuleInput: function (productPropertyRule, i) {
    return <RuleInputs productPropertyRule={productPropertyRule}
                       key={i}
                       handleUpdate={this.handleRuleInput}/>
  },

  handleRuleInput: function (ruleKey, ruleState) {
    var groupCopy = _.extend({}, this.state.productGroup);
    groupCopy.productPropertyRules[ruleKey] = ruleState;
    Session.set("newProductGroup", groupCopy);
    Session.set("editProductGroupId", null);
  },

  addRule: function () {
    var groupCopy = _.extend({}, this.state.productGroup),
      newRule = ProductGroups.getNewProductPropertyRule(),
      newRules = groupCopy.productPropertyRules.concat(newRule);
    groupCopy.productPropertyRules = newRules;
    this.setState({productGroup: groupCopy});
  },

  // ** End Rule Input Code **

  // ** Default Input Code **

  renderDefaultInput: function (inputKey) {
    var productGroup = this.state.productGroup;
    return <DefaultInput  value={productGroup[inputKey]}
                          handleUpdate={this.handleDefaultInput}
                          key={inputKey}/>
  },

  renderDefaultInputs: function () {
    var defaultKeys = ['name', 'description', 'category']
    return (
      <div className="default-inputs-div">
        {defaultKeys.map(this.renderDefaultInput)}
      </div>
    )
  },

  handleDefaultInput: function (key, value) {
    var groupCopy = _.extend({}, this.state.productGroup);
    groupCopy[key] = value;
    Session.set("newProductGroup", groupCopy);
    Session.set("editProductGroupId", null);
  },

  // ** End Default Input Code **

  afterSave: function (error, success) {
    if (success) {
      ProductGroups.resetProductGroup();

    } else {
      this.setState({ error: error });
    }
  },

  handleSubmit: function () {
    Meteor.call("productGroupsUpsert", this.state.productGroup, this.afterSave);
  },

  render: function () {
    var headerText;
    if (this.state.isEditing) {
      headerText = 'Edit Product Group: ' + this.state.productGroup.name;
    } else {
      headerText = 'Add a New Product Group';
    }
    return (
      <div className="product-form-div">
        <h3> {headerText} </h3>

        <form className="form form-horizontal">
          <h4 className="product-property-rules-inputs-header">
            General Properties
          </h4>

          {this.renderDefaultInputs()}

          <h4 className="product-property-rules-inputs-header">
            Product Property Rules
          </h4>
          {this.state.productGroup.productPropertyRules
            .map(this.renderRuleInput)}
        </form>

        <div className="form-group row input-div">
          <div className="col-sm-12">
            <a  className="btn btn-primary form-control"
                onClick={this.addRule}>
              Add Product Property Rule
            </a>
          </div>
        </div>

        <div className="form-group row input-div">
          <div className="col-sm-12">
            <a  className="btn btn-success form-control"
                onClick={this.handleSubmit}>
             Submit
            </a>
          </div>
        </div>
      </div>
    )
  }
});

DefaultInput =  React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    return {
      value: this.props.value
    };
  },

  componentDidUpdate: function () {
    this.props.handleUpdate(this.props.key, this.state.value);
  },

  render: function () {
    return (
       <div className="form-group default-inputs">
        <div className="col-sm-12">
          <label className="control-label">
            {Util.capitalizedString(this.props.key)}
          </label>
          <input  className="form-control" required
                  valueLink={this.linkState('value')}/>
        </div>
      </div>
    )
  }
});