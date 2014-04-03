/**
 * @jsx React.DOM
 */

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
          <div className="col-sm-9 pull-right">
            <a href="#" className="btn btn-primary form-control"
                        onClick={this.props.handleSubmit}> Submit</a>
          </div>
        </div>
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
      <select className="form-control bordered"
              valueLink={this.linkState('value')}>
        {allowedValues.map(allowedOption)}
      </select>
    )
  },

  renderOpenInput: function () {
    return (
      <input  type={this.props.kind}
              className="form-control bordered"
              valueLink={this.linkState('value')}/>
    )
  },

  render: function () {
    var inputBlock;
    var allowedValues = this.props.allowedValues;

    if (allowedValues && allowedValues.length > 0 && allowedValues[0].length > 0) {
      inputBlock = this.renderAllowedInput(allowedValues);
    } else {
      inputBlock = this.renderOpenInput();
    }

    return (
      <div className="product-property-input-div">
        <div className="form-group">
          <label className="col-sm-3 control-label">
            {this.props.name}
          </label>
          <div className="col-sm-9">
            {inputBlock}
          </div>
        </div>
      </div>
    )
  }

});

ProductDefaultInputs = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    var product = this.props.product;
    var inputs = this.props.defaultKeys.map(function (defaultKey) {
      return {label: defaultKey, value: product[defaultKey]}
    })
    return {
      inputs: inputs
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
          <label className="col-sm-3 control-label">
            {this.props.key}
          </label>
          <div className="col-sm-9">
            <input  type="text"
                    className="form-control bordered"
                    valueLink={this.linkState('value')}/>
          </div>
        </div>
      </div>
    )
  }

});

ProductImagesInput = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      imageIds: this.props.imageIds || []
    };
  },

  componentDidUpdate: function () {
    this.props.handleUpdate(this.state.imageIds);
    // console.log("images value: " + this.state.imageIds);
    // this.props.handleUpdate(this.props.key, this.state.value);
  },

  handleChange: function (e) {
    var that = this;
    FS.Utility.eachFile(e, function (file) {
      var newFile = new FS.File(file);
      newFile.attachData(file);

      ProductImages.insert(newFile, function (err, productImage) {
        var newImageIds = that.state.imageIds.concat([productImage._id]);
        that.setState({imageIds: newImageIds});
      });

    })
  },

  handleReset: function (e) {
    this.setState({imageIds: []})
  },

  renderImagePreview: function (imageId, i) {
    return <ProductImagesBlock key={i}
                               imageId={imageId}
                               className="col-sm-3"/>
  },

  render: function () {
    return (
      <div className="product-images-input-div">
        <div className="col-sm-12">
          {this.state.imageIds.map(this.renderImagePreview)}
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">
            Image:
          </label>
          <div className="col-sm-9">
            <input  type="file"
                    className="fileUploader"
                    onChange={this.handleChange}/>
          </div>
          <div className="col-sm-12">
            <div className="col-sm-12">
              <a className="btn btn-danger form-control"
                 onClick={this.handleReset}>
                Reset
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

ProductOptionInputs = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    return {
      name: this.props.name,
      values: this.props.values
    };
  },

  addOptionValue: function () {
    var valuesCopy = this.state.values.concat([""]);
    this.setState({values: valuesCopy});
  },

  handleOptionValueUpdate: function (valueKey, value) {
    var valuesCopy = this.state.values.concat([]);
    valuesCopy[valueKey] = value;
    this.props.handleUpdate(this.state.name, valuesCopy);
  },

  renderOptionValueInput: function (value, i) {
    var handleUpdate = this.handleOptionValueUpdate;
    return <ProductOptionValueInput key={i}
                                    value={value}
                                    handleUpdate={handleUpdate}/>
  },

  render: function () {
    return (
      <div className="product-option-input-div">
        <div className="form-group">
          <label className="col-sm-3 control-label">
            {this.state.name}
          </label>
          <div className="col-sm-9">
            {this.state.values.map(this.renderOptionValueInput)}
          </div>
        </div>
        <div className="form-group">
         <div className="col-sm-9 pull-right">
          <a  className="btn btn-success form-control"
              href="#"
              onClick={this.addOptionValue}>
            Add Option Value
          </a>
        </div>
        </div>
      </div>
    )
  }
});

ProductOptionValueInput = React.createClass({
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

            <input  type="text"
                    className="option-input form-control bordered"
                    valueLink={this.linkState('value')}/>

    )
  }
});

ProductFormSectionButton = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    this.props.onClick();
    this.setState({active: true})
  },

  render: function () {
    var active = this.props.active ? "active" : "";
    var className = "btn option-input form-control bordered " + active;
    return (
      <div className="col-sm-3 section-button">
        <a className={className} onClick={this.handleClick}>
          {this.props.section}
        </a>
      </div>

    )
  }
});