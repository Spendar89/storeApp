/**
 * @jsx React.DOM
 */

BlockRow = React.createClass({

  handleEdit: function (e) {
    this.props.handleEdit(this.props.key);
  },

  handleRemove: function (e) {
    this.props.handleRemove(this.props.key);
  },

  render: function () {
    var className = this.props.classString + '-' + this.props.key;
    return (
      <li key={this.props.key} className="col-sm-12 media">
        <span className="pull-left">
          <a href={this.props.showPath}>
            {this.props.text || this.props.doc.name}
          </a>
        </span>
        <span className="pull-right">
          <a  className="inline-btn btn btn-info"
              onClick={this.handleEdit}>
            Edit
          </a>
        </span>
        <span className="pull-right">
          <a  className="inline-btn btn btn-danger"
              onClick={this.handleRemove}>
            Remove
          </a>
        </span>
      </li>
    );
  }
});

