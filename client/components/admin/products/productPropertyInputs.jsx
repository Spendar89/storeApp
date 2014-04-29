/**
 * @jsx React.DOM
 */

ProductPropertyInputs = React.createClass({

  renderPropertyInput: function (productPropertyRule, i) {
    var property = this.props.properties[productPropertyRule.name] || {};
    property.name = productPropertyRule.name;
    return <ProductPropertyInput  handleUpdate={this.props.handleUpdate}
                                  property={property}
                                  productPropertyRule={productPropertyRule}
                                  key={i} />
  },

  handleReset: function () {
    //change to props.reset
    Session.set("editProduct", null);
    Session.set("newProduct", Products.getNewProduct(Session.get("productGroup")));
  },

  render: function () {
    var productGroup = this.props.productGroup;
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