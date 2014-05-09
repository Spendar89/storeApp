/**
 * @jsx React.DOM
 */

ProductPropertyInputs = React.createClass({

  renderPropertyInput: function (productPropertyRule, i) {
    var property = this.props.product.properties[productPropertyRule.name] || {};
    property.name = productPropertyRule.name;
    return <ProductPropertyInput  handleUpdate={this.props.handleUpdate}
                                  property={property}
                                  productPropertyRule={productPropertyRule}
                                  key={i} />
  },
  componentWillReceiveProps: function () {
    console.log("receiveing props@")
  },

  render: function () {
    var productGroup = this.props.productGroup;
    return (
      <div className="product-property-inputs">
        { productGroup.productPropertyRules.map(this.renderPropertyInput) }
      </div>
    )
  }

});