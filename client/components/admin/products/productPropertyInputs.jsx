/**
 * @jsx React.DOM
 */

ProductPropertyInputs = React.createClass({

  getInitialState: function () {
    return {
      properties: this.props.properties,
      productGroup: this.props.productGroup
    };
  },

  renderPropertyInput: function (propertyRule, i) {
    var property = this.state.properties[propertyRule.name];
    var propertyValue = property && property.value;
    return <ProductPropertyInput  handleUpdate={this.handlePropertyUpdate}
                                  property={property}
                                  propertyRule={propertyRule}
                                  key={i} />
  },

  handlePropertyUpdate: function (property) {
    var properties = _.extend({}, this.state.properties);
    properties[property.name] = property;
    this.props.handleUpdate(properties);
  },

  handleReset: function () {
    //change to props.reset
    Session.set("editProduct", null);
    Session.set("newProduct", getNewProduct(Session.get("productGroup")));
  },

  render: function () {
    var productGroup = this.state.productGroup;
    var productPropertyRules = productGroup && productGroup.productPropertyRules;
    return (
      <div>
        {productPropertyRules.map(this.renderPropertyInput)}
        <div className="form-group product-property-input-div">
          <div className="col-sm-9 pull-right">
            <a href="#" className="btn btn-danger form-control"
                        onClick={this.handleReset}> Reset</a>
          </div>
        </div>
      </div>
    );
  }

});