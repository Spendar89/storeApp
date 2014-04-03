/**
 * @jsx React.DOM
 */

CartProductOptionSelect = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    var cartProduct = Session.get("cartProduct");
    return {
      initialValue: cartProduct.options[this.props.key],
      newValue: cartProduct.options[this.props.key]
    };
  },

  componentDidUpdate: function () {
    if (this.state.newValue != this.state.initialValue) {
      var cartProductCopy = _.extend({}, Session.get("cartProduct"));
      cartProductCopy.options[this.props.key] = this.state.newValue;
      Session.set("cartProduct", cartProductCopy);
    }
  },

  renderOptionValue: function (optionValue, i) {
    return (
      <option key={i}
              value={optionValue}>
        {optionValue}
      </option>
    )
  },

  render: function () {
    return (
      <div className="row margin-row">
        <div className="col-sm-12">
          <select required="true"
                  className="form-control bordered"
                  valueLink={this.linkState('newValue')}>
                  <option>{this.props.key}</option>
            {this.props.optionValues.map(this.renderOptionValue)}
          </select>
        </div>
      </div>
    )
  }
});