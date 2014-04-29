/**
 * @jsx React.DOM
 */

AdminOrderRow = React.createClass({

  handleEdit: function (order) {
    Session.set("editOrder", order);
  },

  handleRemove: function (order) {
    Meteor.call("ordersRemove", order._id);
  },

  render: function () {
    var order = this.props.order;
    var cart = Carts.findOne(order.cartId)
    var cartProduct = _.compact(cart.cartProducts)[0];
    var imageId = cartProduct ? cartProduct.product.imageIds[0] : null;
    var image = ProductImages.findOne(imageId);
    return (
      <div className="media" key={this.props.key}>
        <a className="pull-left" href="#">
          <img className="img-circle media-object"
               src={image && image.url()}
               width="64"
               alt=""/>
        </a>
        <div className="media-body">
          <h5 className="media-heading">ID: {order._id}</h5>
          <p>Customer: {order.firstName} {order.lastName}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${cart.total}</p>
        </div>
      </div>
    )
  }
});