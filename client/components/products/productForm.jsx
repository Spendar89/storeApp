/**
 * @jsx React.DOM
 */

ProductForm = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    var newProduct = Session.get("newProduct");
    var editProduct = Products.findOne(Session.get("editProductId"));
    var product = editProduct || newProduct;
    var productGroup = Session.get("productGroup");

    var rules = productGroup.productPropertyRules;

    // This is janky....but oh well for meow....
    var productPropertyRules = _.filter(rules, function (rule) {
      return rule.kind != 'option';
    });

    return {
      productGroup: productGroup,
      productPropertyRules: productPropertyRules,
      product: product,
      isEditing: product._id ? true : false,
      error: false,
      sections: ["defaults", "options", "properties", "images"]
    };
  },

  renderPropertiesFormGroup: function () {
    var productPropertyRules = this.state.productPropertyRules;
    var properties = this.state.product.properties;
    return <ProductPropertyInputs productPropertyRules={productPropertyRules}
                                  handleUpdate={this.handlePropertiesUpdate}
                                  properties={properties}
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
                               handleUpdate={this.handleOptionsUpdate} />
  },

  renderImagesInput: function () {
    var product = this.state.product;
    return <ProductImagesInput productGroup={this.state.productGroup}
                               imageIds={this.state.product.imageIds}
                               product={product}
                               handleUpdate={this.handleImagesUpdate} />
  },

  updateProduct: function (productCopy) {
    Session.set("newProduct", productCopy);
    Session.set("editProductId", null);
  },

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

  handlePropertiesUpdate: function (propertyName, propertyValue) {
    var productCopy = _.extend({}, this.state.product);
    productCopy.properties[propertyName].value = propertyValue;
    this.updateProduct(productCopy)
  },

  handleSubmit: function () {
    Meteor.call("productsUpsert", this.state.product, this.afterSave);
  },

  afterSave: function (error, success) {
    if (success) {
      var productId = success.insertedId || this.state.product._id;
      Session.set("editProductId", productId);
    } else {
      this.setState({ error: error });
    }
  },

  changeSection: function (section, event) {
    this.setState({currentSection: section});
  },

  renderSectionButton: function (section, i) {
    var isDefault = !this.state.currentSection && section === "defaults"
    var isActive = this.state.currentSection === section;
    var changeSection = this.changeSection.bind(this, section);
    return (
      <ProductFormSectionButton active={isActive || isDefault}
                                section={section}
                                key={i}
                                onClick={changeSection}/>
    )
  },

  render: function () {
    var headerText,
    name = this.state.product.name,
    productOptions = this.state.product.options;

    if (this.state.isEditing) {
      headerText = "Edit " + name
    } else {
      headerText = "Add a New " + this.state.productGroup.name;
    }

    var currentSection = this.state.currentSection || "defaults";
    var currentClassName = currentSection + "-section form-section";
    var currentHeader = currentSection.toUpperCase();
    var currentRender;

    if (currentSection === "defaults") {
      currentRender = this.renderDefaultInputs();
    } else if (currentSection === "options") {
      currentRender = this.renderOptionsFormGroup();
    } else if (currentSection === "properties") {
      currentRender = this.renderPropertiesFormGroup();
    } else if (currentSection === "images") {
      currentRender = this.renderImagesInput();
    }

    return (
            <div className="product-form-div">
              <h1> {headerText} </h1>
              <div className="section-buttons-div">
                {this.state.sections.map(this.renderSectionButton)}
              </div>
              <form className="form form-horizontal product-form">
                <div className={currentClassName}>
                  <h2>{currentHeader}</h2>
                  {currentRender}
                </div>
              </form>
            </div>
          )
  }
})


