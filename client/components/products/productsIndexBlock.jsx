/**
 * @jsx React.DOM
 */

ProductsIndexBlock = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var filter = Session.get("productsFilter") || {}
    return {
      products: Products.find(Util.cleanup(filter)).fetch()
    };
  },

  renderProduct: function (product, i) {
    return <ProductsIndexProductBlock product={product}
                                      key={i}
                                      gridClass="col-sm-4"
                                      themeClass="default"/>
  },

  renderFilters: function () {
    return (
      <div className="col-sm-12">
        <ProductsProductGroupFilter/>
      </div>
    )
  },

  render: function () {
    return (
      <div className="products-index-block">
        {this.renderFilters()}
        {_.map(this.state.products, this.renderProduct)}
      </div>
    )
  }
});

ProductsIndexProductBlock = React.createClass({
  renderProductImage: function () {
    if (this.props.product.imageIds) {
      return <ProductImagesBlock  key={this.props.key}
                                  imageId={this.props.product.imageIds[0]}
                                  className="fit-height"/>
    } else {
      return <div className="no-product-image">No Image</div>
    }
  },

  render: function () {
    var product = this.props.product;
    var headerText = product.name + " - " + product.price;
    var className = this.props.gridClass + " " + this.props.themeClass;
    var href = "/products/" + this.props.product._id;
    return (
      <div className={className + " product-block"}>
        <div className="inner">
          <a href={href} className="secondary product-name-price-text col-sm-12">
            <div className="product-img col-sm-12">
                {this.renderProductImage()}
            </div>
            <div className="product-name-price col-sm-12 centered">
              {product.name} - ${product.price}
            </div>
            <div className="product-body">
              <div className="col-sm-12">
              </div>
            </div>
          </a>
        </div>
      </div>
    )

  }
});