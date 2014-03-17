/**
 * @jsx React.DOM
 */

ProductDetailBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var product = Session.get("product");
    var productGroup = Session.get("productGroup");
    return {
      productGroup: productGroup,
      product: product
    };
  },

  renderSpecs: function () {

  },

  renderBasic: function () {
    var product = this.state.product;
    return (
            <div className="product-basic-div">
              <h1> {product.headline || product.name} </h1>
              <h2> ${product.price} </h2>
              <p> {product.description} </p>
            </div>
            )
  },

  renderProperty: function (property, propertyName) {
    if (property.value) {
     return (
          <div>
            <dt>{propertyName}</dt>
            <dd>{property.value}</dd>
          </div>
          )
    }

  },

  renderProperties: function () {
    var product = this.state.product;
    return (
            <div className="product-basic-div">
              <h1> Specs </h1>
              <dl className="dl-horizontal">
                {_.map(product.properties, this.renderProperty)}
              </dl>
            </div>
            )
  },

  renderOption: function (optionValues, optionName) {
    var renderValue = function (optionValue, i) {
      return (
        <option key={i}
                value={optionValue}>
          {optionValue}
        </option>
      )
    };
    return (
            <div className="row">
              <label className="col-sm-3"><h3>{optionName}</h3></label>
              <div className="col-sm-9">
                <select className="form-control bordered">
                  {optionValues.map(renderValue)}
                </select>
              </div>
            </div>
            )
  },

  renderOptions: function () {
    var product = this.state.product;
    return (
            <div className="product-options-div">
              <h1> Options </h1>
              <dl className="dl-horizontal product-options-div">
                {_.map(product.options, this.renderOption)}
              </dl>
            </div>
          )
  },

  render: function () {

    return (
            <div className="product-detail-block-div row">
              {this.renderBasic()}
              {this.renderOptions()}
              {this.renderProperties()}
            </div>
          )
  }
});