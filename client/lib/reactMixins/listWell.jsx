/**
 * @jsx React.DOM
 */

ListWellMixin = {


  renderRow: function (row, index) {
    var header = row.header

    var renderSubRow = function (subRow, i) {
      return <p key={i}> {subRow} </p>
    };

    return (
      <div className="media" key={index}>
        <a className="pull-left" href="#">
          <img className="img-circle media-object"
               src="assets/img/users/1.jpg"
               width="64"
               alt=""/>
        </a>
        <div className="media-body">
          <h5 className="media-heading">{row.header}</h5>
          {_.map(row.subRows, renderSubRow)}
        </div>
      </div>
    )
  },

  render: function () {
    return (
      <div className="well">
        <div className="header">
          {this.props.header}
          <a className="headerrefresh">
            <i className="fa fa-refresh pull-right"></i>
          </a>
        </div>
        {_.map(this.props.rows, this.renderRow)}
      </div>
    )
  }
};

