/**
 * @jsx React.DOM
 */

OrderForm = React.createClass({

  render: function () {
    return (
      <div className={this.props.className}>
        <UserNameForm header="User Name"
                      className="user-name-form-div"
                      keys={[ "firstName",
                          "lastName" ]}/>
        <UserAddressForm header="User Address"
                         className="user-address-form-div"
                         keys={[ "streetAddress",
                                 "city",
                                 "state",
                                 "zipcode" ]}/>
        <StripeCustomerBlock/>
      </div>
    )
  }
});
