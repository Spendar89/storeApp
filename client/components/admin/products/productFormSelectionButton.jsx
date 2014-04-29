/**
 * @jsx React.DOM
 */

ProductFormSectionButton = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    this.props.handleClick(this.props.sectionName);
  },

  render: function () {
    var isCurrent = this.props.currentSectionName === this.props.sectionName;
    var className = isCurrent ? "current" : "done";
    return (
      <li role="tab" className={className}>
        <a onClick={this.handleClick}>
          {this.props.sectionName}
        </a>
      </li>
    )
  }
});