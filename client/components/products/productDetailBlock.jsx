/**
 * @jsx React.DOM
 */

ProductDetailBlock = React.createClass({
  mixins: [ReactMeteor.Mixin, React.LinkedStateMixin],

  getMeteorState: function () {
    return {
      productGroup: Session.get("productGroup"),
      product: Session.get("product"),
      cartProduct: Session.get("cartProduct")
    };
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

  renderAddToCartBtn: function () {
    return <AddToCartBtn cartProduct={this.state.cartProduct}/>
  },

  renderCartProductOptionSelects: function () {
    return (
      <div className="product-options-div">
        <h1> Options </h1>
        <dl className="dl-horizontal product-options-div">
          {_.map(this.state.product.options, function(values, key) {
            return <CartProductOptionSelect optionValues={values}
                                            key={key} />
          })}
        </dl>
      </div>
    )
  },

  render: function () {
    return (
      <div className="product-detail-block-div row">
        {this.renderBasic()}
        {this.renderCartProductOptionSelects()}
        {this.renderAddToCartBtn()}
        {this.renderProperties()}
      </div>
    )
  }
});