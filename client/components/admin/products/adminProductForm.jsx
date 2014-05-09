/**
 * @jsx React.DOM
 */

AdminProductForm = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      product: (Session.get("editProduct") || Session.get("newProduct"))
    };
  },

  renderPropertyInputs: function () {
    var allRules = this.props.productGroup.productPropertyRules;
    var productPropertyRules = _.filter(allRules, function (rule) {
      return rule.kind != 'option';
    });;
    return <ProductPropertyInputs productPropertyRules={productPropertyRules}
                                  handleUpdate={this.handlePropertiesUpdate}
                                  product = {this.state.product}
                                  productGroup={this.props.productGroup}
                                  handleSubmit={this.handleSubmit} />
  },

  renderOptionsFormGroup: function () {
    var productOptions = this.state.product.options;
    return _.map(productOptions, this.renderOptionInputs)
  },

  renderDefaultInputs: function () {
    var defaultKeys = ['name', 'price', 'slug', 'description', 'headline']
    return <ProductDefaultInputs  product={this.state.product}
                                  defaultKeys={defaultKeys}
                                  handleUpdate={this.handleDefaultsUpdate} />
  },
  renderOptionInputs: function (values, key) {
    return <ProductOptionInputs name={key}
                                values={values}
                                key={key}
                                handleChange={this.handleOptionsUpdate} />
  },

  renderImagesInput: function () {
    var product = this.state.product;
    return <ProductImagesInput productGroup={this.props.productGroup}
                               imageIds={this.state.product.imageIds}
                               product={product}
                               handleUpdate={this.handleImagesUpdate} />
  },

  updateProduct: function (productCopy) {
    ProductActions.edit(productCopy);
  },

  // componentDidUpdate: function () {
  //   ProductActions.edit(this.state.product);
  // },

  handleImagesUpdate: function (newImageIds) {
    var product = this.state.product;
    if (product.imageIds != newImageIds) {
      var productCopy = _.extend({}, product);
      productCopy.imageIds = newImageIds;
      this.updateProduct(productCopy)
    }
  },

  handleOptionsUpdate: function (optionName, values) {
    var productCopy = _.extend({}, this.state.product);
    productCopy.options[optionName] = values;
    this.updateProduct(productCopy)
  },

  handleDefaultsUpdate: function (propertyName, propertyValue) {
    var productCopy = _.extend({}, this.state.product);
    productCopy[propertyName] = propertyValue;
    this.updateProduct(productCopy)
  },

  handlePropertiesUpdate: function (property) {
    var productCopy = _.extend({}, this.state.product);
    productCopy.properties[property.name] = property;
    this.updateProduct(productCopy)
  },

  // handleOptionsNew: function (optionName) {
  //   var productCopy = _.extend({}, this.state.product);
  //   productCopy.options[optionName].push("");
  //   this.updateProduct(productCopy);
  // },

  handleSubmit: function () {
    ProductActions.upsert(this.state.product);
  },

  componentDidMount: function () {
    this.changeSection("defaults");
  },

  changeSection: function (sectionName) {
    var sections = {
      defaults: this.renderDefaultInputs,
      options: this.renderOptionsFormGroup,
      properties: this.renderPropertyInputs,
      images: this.renderImagesInput
    };
    var newSection = sections[sectionName];
    // TODO: don't set currentSection on state directly...
    // Add method renderCurrentSection based on section name
    if (newSection) {
      this.setState({currentSection: newSection(),
                     currentSectionName: sectionName});
    }
  },

  renderSectionButton: function (sectionName, i) {
    return (
      <ProductFormSectionButton sectionName={sectionName}
                                key={i}
                                currentSectionName={this.state.currentSectionName}
                                handleClick={this.changeSection}/>
    )
  },

  renderSectionButtons: function () {
    var sectionNames =  ["defaults", "options", "properties", "images"];
    return (
      <div id="wizard" className="wizard clearfix">
        <div className="steps clearfix">
          <ul role="tablist">
            {_.map(sectionNames, this.renderSectionButton)}
          </ul>
        </div>
      </div>
    )
  },

  render: function () {
    var productOptions = this.state.product.options;
    var isEditing = this.state.product._id ? true : false;


    if (isEditing) {
      var headerText = "Edit " + this.state.product.name
    } else {
      var headerText = "Add a New " + this.props.productGroup.name;
    }

    return (
      <div className="col-sm-12 well">
        <div className="header"> {headerText} </div>
        {this.renderSectionButtons()}
        <form className="form form-horizontal product-form">
          {this.state.currentSection}
          <div className="form-group product-property-input-div">
            <div className="col-sm-9 pull-right">
              <a href="#" className="btn btn-primary form-control"
                          onClick={this.handleSubmit}>
                Submit {this.props.productGroup.name}
              </a>
            </div>
          </div>
        </form>
      </div>
    )
  }
})


