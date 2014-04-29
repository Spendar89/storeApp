/**
 * @jsx React.DOM
 */

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