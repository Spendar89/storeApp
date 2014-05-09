/**
 * @jsx React.DOM
 */

ProductDetailBlock = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    return {
      productGroup: Session.get("productGroup"),
      product: Session.get("product"),
      cartProduct: Session.get("cartProduct")
    };
  },

  componentDidMount: function () {
    var domNode = this.getDOMNode();
    this.$domNode = $(domNode);
    this.$content = $(this.state.product.description);
    this.$domNode.find(".description").html(this.$content);
  },

  renderBasic: function () {
    var product = this.state.product;
    return (
            <div className="product-basic-div">
              <h1> {product.headline || product.name} </h1>
              <h2> ${product.price} </h2>
              <p className="description"></p>
            </div>
            )
  },

  renderProperty: function (property, propertyName) {
    if (property.value) {
      return (
        <div key={propertyName}>
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
    return (
      <div className="row add-to-cart-div">
        <div className="col-sm-4">
          {this.renderQtyInput()}
        </div>
        <div className="col-sm-8">
          <AddToCartBtn cartProduct={this.state.cartProduct}/>
        </div>
      </div>
    )
  },

  handleQuantityChange: function (e) {
    var newQuantity = parseInt(e.target.value);
    console.log("new quantity: " + newQuantity);
    var cartProductCopy = _.extend({}, this.state.cartProduct);
    cartProductCopy.quantity = newQuantity;
    this.setState({cartProduct: cartProductCopy});
  },

  renderQtyInput: function () {
    return <input type="number"
                  value={this.state.cartProduct.quantity}
                  className="cart-product-qty form-control bordered"
                  placeholder="Quantity"
                  onChange={this.handleQuantityChange}/>
  },

  renderOptionSelects: function () {
    var that = this;
    return _.map(this.state.product.options, function(values, key) {
      return <CartProductOptionSelect optionValues={values}
                                      key={key}/>
    })
  },

  renderCartProductOptionSelects: function () {
    return (
      <div className="product-options-div">
        <h1> Options </h1>
        <dl className="dl-horizontal product-options-div">
          {this.renderOptionSelects()}
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