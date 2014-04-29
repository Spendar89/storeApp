/**
 * @jsx React.DOM
 */

ProductDefaultInputs = React.createClass({
  mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  getMeteorState: function () {
    var product = Session.get("editProduct") || Session.get("newProduct");
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