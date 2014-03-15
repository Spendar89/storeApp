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
    return {
      productGroup: productGroup,
      productPropertyRules: productGroup.productPropertyRules,
      product: product,
      isEditing: product._id ? true : false,
      error: false
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

  renderDefaultInputs: function () {
    var product = this.state.product;
    return <ProductDefaultInputs  name={product.name}
                                  price={product.price}
                                  slug={product.slug}
                                  handleUpdate={this.handleDefaultsUpdate} />
  },

  handleDefaultsUpdate: function (propertyName, propertyValue) {
    var productCopy = _.extend({}, this.state.product);
    productCopy[propertyName] = propertyValue;
    Session.set("newProduct", productCopy);
    Session.set("editProductId", null);
  },

  handlePropertiesUpdate: function (propertyName, propertyValue) {
    var productCopy = _.extend({}, this.state.product);
    productCopy.properties[propertyName].value = propertyValue;
    Session.set("newProduct", productCopy);
    Session.set("editProductId", null);
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

  render: function () {
    var headerText;
    if (this.state.isEditing) {
      headerText = "Edit " + this.state.productGroup.name + " Id: " + this.state.product._id;
    } else {
      headerText = "Add a New " + this.state.productGroup.name;
    }
    return (
            <div className="product-form-div">
              <h3> {headerText} </h3>
              <form className="form form-horizontal">
                {this.renderDefaultInputs()}
                {this.renderPropertiesFormGroup()}
              </form>
            </div>
          )
  }
})

ProductPropertyInputs = React.createClass({

  renderPropertyInput: function (propertyRule, i) {
    var propertyValue = this.props.properties[propertyRule.name].value
    return <ProductPropertyInput  handleUpdate={this.props.handleUpdate}
                                  name={propertyRule.name}
                                  kind={propertyRule.kind}
                                  allowedValues={propertyRule.allowedValues}
                                  value={propertyValue}
                                  key={i} />
  },

  handleReset: function () {
    Session.set("editProductId", null);
    Session.set("newProduct", getNewProduct(Session.get("productGroup")));
  },

  render: function () {
    return (
      <div>
        {this.props.productPropertyRules.map(this.renderPropertyInput)}
        <div className="form-group product-property-input-div">
          <div className="col-sm-10 pull-right">
            <a href="#" className="btn btn-primary form-control"
                        onClick={this.props.handleSubmit}> Submit</a>
          </div>
        </div>
        <div className="form-group product-property-input-div">
          <div className="col-sm-10 pull-right">
            <a href="#" className="btn btn-danger form-control"
                        onClick={this.handleReset}> Reset</a>
          </div>
        </div>
      </div>
    );
  }

});

ProductDefaultInputs = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    return {
      inputs: [ {label: 'name', value: this.props.name},
                {label: 'price', value: this.props.price},
                {label: 'slug', value: this.props.slug}
              ]
    };
  },

  renderDefaultInput: function(input) {
    return <ProductDefaultInput key={input.label}
                                value={input.value}
                                handleUpdate={this.props.handleUpdate}/>
  },

  render: function () {
    return (
      <div>
        {this.state.inputs.map(this.renderDefaultInput)}
      </div>
    )
  }

});

ProductDefaultInput = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    return {
      value: this.props.value
    };
  },

  componentDidUpdate: function () {
    this.props.handleUpdate(this.props.key, this.state.value);
  },

  render: function () {
    return (
      <div className="product-property-input-div">
        <div className="form-group">
          <label className="col-sm-2 control-label">
            {this.props.key}
          </label>
          <div className="col-sm-10">
            <input  type="text"
                    className="form-control"
                    valueLink={this.linkState('value')}/>
          </div>
        </div>
      </div>
    )
  }

});


ProductPropertyInput = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    return {
      value: this.props.value
    };
  },

  componentDidUpdate: function () {
    this.props.handleUpdate(this.props.name, this.state.value);
  },

  renderAllowedInput: function (allowedValues) {
    var allowedOption = function (allowedValue, i) {
      return (
        <option key={i}
                value={allowedValue}>
          {allowedValue}
        </option>
      )
    };
    return (
      <select className="form-control"
              valueLink={this.linkState('value')}>
        {allowedValues.map(allowedOption)}
      </select>
    )
  },

  renderOpenInput: function () {
    return (
      <input  type={this.props.kind}
              className="form-control"
              valueLink={this.linkState('value')}/>
    )
  },

  render: function () {
    var inputBlock;
    var allowedValues = this.props.allowedValues;

    if (allowedValues && allowedValues.length > 0) {
      inputBlock = this.renderAllowedInput(allowedValues);
    } else {
      inputBlock = this.renderOpenInput();
    }

    return (
      <div className="product-property-input-div">
        <div className="form-group">
          <label className="col-sm-2 control-label">
            {this.props.name}
          </label>
          <div className="col-sm-10">
            {inputBlock}
          </div>
        </div>
      </div>
    )
  }

});