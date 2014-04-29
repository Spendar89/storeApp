/**
 * @jsx React.DOM
 */

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