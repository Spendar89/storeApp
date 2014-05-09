/**
 * @jsx React.DOM
 */

ProductOptionInputs = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getMeteorState: function () {
    return {
      values: this.props.values
    };
  },

  handleChange: function (index, value) {
    var valuesCopy = _.extend([], this.state.values);
    valuesCopy[index] = value;
    this.setState({values: valuesCopy});
  },

  handleNew: function () {
    var valuesCopy = _.extend([], this.state.values);
    this.setState({values: valuesCopy.concat("")});
  },

  componentDidUpdate: function () {
    this.props.handleChange(this.props.name, this.state.values);
  },

  renderOptionValueInput: function (value, i) {
    return <ProductOptionInput key={i}
                               value={value}
                               handleChange={this.handleChange}/>
  },

  render: function () {
    console.log("rerendering!!!");
    return (
      <div className="product-option-input-div">
        <div className="form-group">
          <label className="col-sm-3 control-label">
            {this.props.name}
          </label>
          <div className="col-sm-9">
            {this.state.values.map(this.renderOptionValueInput)}
          </div>
        </div>
        <div className="form-group">
         <div className="col-sm-9 pull-right">
          <a  className="btn btn-success form-control"
              href="#"
              onClick={this.handleNew}>
            Add Option Value
          </a>
        </div>
        </div>
      </div>
    )
  }
});