/**
 * @jsx React.DOM
 */

ProductGroupForm = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return Session.get("editProductGroup") || Session.get("newProductGroup");
  },

  handleChange: function (key, value) {
    var productGroupCopy = _.extend({}, this.state);
    productGroupCopy[key] = value;
    this.setState(productGroupCopy);
    // this.setState({key: value});
  },

  // componentDidUpdate: function () {
  //   Session.set("editProductGroup", this.state);
  // },

  handleNewProductPropertyRule: function () {
    var newRule = ProductPropertyRules.build();
    var oldRules = this.state.productPropertyRules || [];
    this.setState({
      productPropertyRules: oldRules.concat(newRule)
    });
  },

  renderDefaultInput: function (inputKey) {
    return <DefaultInput  value={this.state[inputKey]}
                          handleUpdate={this.handleChange}
                          key={inputKey}/>
  },

  renderDefaultInputs: function () {
    return (
      <div className="default-inputs-div">
        {this.props.defaultKeys.map(this.renderDefaultInput)}
      </div>
    )
  },

  handleSubmit: function () {
    Meteor.call("productGroupsUpsert", this.state);
    Session.set("editProductGroup", null);
  },

  render: function () {
    var productPropertyRules = this.state.productPropertyRules;
    if (this.state._id) {
      var headerText = 'Edit Product Group: ' + this.state.name;
    } else {
      var headerText = 'Add a New Product Group';
    }
    return (
      <div className="col-sm-12">
        <div className="product-form-div well">
          <div className="header">
            {headerText}
          </div>

          <form className="form-horizontal">

            <div className="form-section">
              {this.renderDefaultInputs()}
            </div>

            <ProductPropertyRulesInputs productGroup={this.state}
                                        handleChange={this.handleChange}
                                        handleNew={this.handleNewProductPropertyRule}/>

            <div className="form-group row input-div">
              <div className="col-sm-12">
                <a  className="btn btn-success form-control"
                    onClick={this.handleSubmit}>
                 Submit
                </a>
              </div>
            </div>

          </form>

        </div>
      </div>

    )
  }
});

DefaultInput =  React.createClass({
  handleChange: function (e) {
    this.props.handleUpdate(this.props.key, e.target.value);
  },
  render: function () {
    return (
       <div key={this.props.key} className="form-group default-inputs">
        <div className="col-sm-12">
          <label className="control-label col-sm-3">
            {Util.capitalizedString(this.props.key)}
          </label>
          <div className="col-sm-9">
            <input  className="form-control" required
                    value={this.props.value}
                    onChange={this.handleChange}/>
          </div>
        </div>
      </div>
    )
  }
});