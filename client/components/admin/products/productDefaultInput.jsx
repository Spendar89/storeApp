/**
 * @jsx React.DOM
 */

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
