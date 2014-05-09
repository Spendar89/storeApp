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

  componentWillMount: function () {
    var cartProductCopy = _.extend({}, Session.get("cartProduct"));
    cartProductCopy.options[this.props.key] = this.props.optionValues[0];
    Session.set("cartProduct", cartProductCopy);
  },

  componentWillUpdate: function (nextProps, nextState) {
    if (nextState.newValue != this.state.initialValue) {
       var cartProductCopy = _.extend({}, Session.get("cartProduct"));
       cartProductCopy.options[this.props.key] = nextState.newValue;
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
          <label className="col-sm-10"> {this.props.key} </label>
          <select required="true"
                  className="form-control col-sm-10"
                  valueLink={this.linkState('newValue')}>
            {this.props.optionValues.map(this.renderOptionValue)}
          </select>
        </div>
      </div>
    )
  }
});