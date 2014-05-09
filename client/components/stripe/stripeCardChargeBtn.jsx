/**
 * @jsx React.DOM
 */

StripeCardChargeBtn = React.createClass({
  render: function () {
    return (
      <div className="stripe-charges-btn-div col-sm-12 row">
        <div className="col-sm-12">
          <a  className="btn btn-success form-control"
              onClick={this.props.onClick}>
            Charge ${this.props.cartTotal} to Card
          </a>
        </div>
      </div>
    )
  }
});