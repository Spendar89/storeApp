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

  handleInput: function (html) {
    if (html != this.state.html) this.setState({value: html});
  },

  componentDidUpdate: function () {
    this.props.handleUpdate(this.props.key, this.state.value);
  },

  render: function () {
    if (this.props.makeEditable) {
      var input = <ContentEditable content={this.state.value}
                                   className="col-sm-9"
                                   onInput={this.handleInput}/>
    } else {
      var input =  <input type="text"
                          className="form-control bordered"
                          valueLink={this.linkState('value')}/>
    }
    return (
      <div className="product-property-input-div">
        <div className="form-group">
          <label className="col-sm-3 control-label">
            {this.props.key}
          </label>
          <div className="col-sm-9">
            {input}
          </div>
        </div>
      </div>
    )
  }

});

ContentEditable = React.createClass({

  getInitialState: function () {
    return {
      formatBlock: "p"
    }
  },

  componentDidMount: function () {
    var domNode = this.getDOMNode();
    this.$domNode = $(domNode);
    this.$content = $(this.props.content);
    this.$domNode.find(".content-editable").html(this.$content);
  },

  componentDidReceiveProps: function (nextProps) {
    this.$content = $(this.props.content);
    this.$domNode.find(".content-editable").html(this.$content);
  },

  handleInput: function () {
    var html = this.refs.content.getDOMNode().innerHTML;
    this.props.onInput(html);
  },

  setFormatBlock: function (e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState({formatBlock: e.target.value});
  },

  render: function () {
    // var cx = React.addons.classSet;
    var formatBlock = this.state.formatBlock;

    document.execCommand('formatBlock', false, this.state.formatBlock);

    var className = this.props.className + " content-editable";
    return(
      <div>
        <div className="format-bar">
          <button  value="h1"
                   onClick={this.setFormatBlock}
                   className="btn btn-default">
            Header
          </button>
          <button  value="h3"
                   onClick={this.setFormatBlock}
                   className="btn btn-default">
            Subheader
          </button>
          <button  value="p"
                   onClick={this.setFormatBlock}
                   className="btn btn-default">
            Normal
          </button>
        </div>
        <div ref="content"
             className={className}
             onInput={this.handleInput}
             contentEditable="true">

        </div>
      </div>
    )

  }

});
