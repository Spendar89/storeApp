/**
 * @jsx React.DOM
 */

ProductOptionInput = React.createClass({
  // mixins: [ReactMeteor.Mixin, React.addons.LinkedStateMixin],

  // getMeteorState: function () {
  //   return {
  //     value: this.props.value
  //   };
  // },

  handleChange: function (e) {
    this.props.handleChange(this.props.key, e.target.value);
  },

  render: function () {
    return (
      <input  type="text"
              value={this.props.value}
              onChange={this.handleChange}
              className="option-input form-control"/>

    )
  }
});