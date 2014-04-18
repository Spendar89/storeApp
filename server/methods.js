Meteor.methods({
  insertProductGroup: function (params) {
    if (this.userId && params) {
      ProductGroups.insert(params);
    }
  },

  updateProductGroup: function (productGroupId, params) {
    ProductGroups.update({
      _id: productGroupId
    }, params);
  },

  insertProduct: function (product) {
    Products.insert(product);
    return Products.findOne(product);
  },

  insertAndReturn: function (Collection, params) {
    var id = Collection.insert(params);
    return Collecftion.findOne(id);
  },

  productsUpsert: function (product, callback) {
    return Products.upsert({_id: product._id}, product);
  },

  productGroupsUpsert: function (productGroup, callback) {
    return ProductGroups.upsert({_id: productGroup._id}, productGroup);
  },

  productGroupsRemove: function (productGroupId) {
    return ProductGroups.remove(productGroupId);
  },

  productsRemove: function (productId) {
    return Products.remove(productId);
  },

  cartsUpsert: function (cart, callback) {
    if (this.userId) {
      return Carts.upsert({_id: cart._id}, cart);
    }
  },

  cartsRemove: function (cart, callback) {
    if (this.userId && cart) {
      Carts.remove(cart._id);
    }
  },

  cartProductRemove: function (cartProductId) {
    return CartProducts.remove(cartProductId);
  },

  addFriend: function (userId, friendId) {
    //Make new friends collection with just user ids...
    var friendIds = user.friendIds || [];
    user.friendIds = friendIds.concat(friendId);
    return Meteor.users.upsert({_id: user._id}, user);
  },

  productImagesRemove: function (productImageId) {
    if (productImageId) {
      return ProductImages.remove(productImageId);
    } else {
      return ProductImages.remove({});
    }
  },

  usersUpdate: function (clientUser, callback) {
    var serverUser = Users.findOne(clientUser._id);
    var user = _.defaults(clientUser, serverUser);
    return Users.update({_id: user._id}, user);
  },

  ordersUpsert: function (order, callback) {
    return Orders.upsert({_id: order._id}, order);
  },

  ordersRemove: function (orderId) {
    if (orderId) {
      return Orders.remove(orderId);
    } else {
      return Orders.remove({});
    }
  },

  stripeChargesCreate: function (paymentState) {
    Stripe.charges.create({
      amount: paymentState.orderTotal,
      currency: "USD",
      card: paymentState.payments.token
    }, function (err, res) {
      console.log(err, res);
    });
  },

  stripeCustomersCreate: function (user, token) {
    console.log("CREATING STRIPE CUSTOMER!!");
    var createdCustomer = _StripeCustomers.create({ card: token });
    console.log("CREATING STRIPE CUSTOMER: created customer: " + JSON.stringify(createdCustomer));
    return Meteor.call("usersUpdateStripeCustomer", user, createdCustomer);
  },

  stripeCustomersCreateCard: function (user, token) {
    var stripeCustomer = user.stripeCustomer;
    if (stripeCustomer) {
      _StripeCustomers.createCard(stripeCustomer.id, {card: token});
      return Meteor.call("usersUpdateStripeCustomer", user);
    } else {
      return Meteor.call("stripeCustomersCreate", user, token);
    }
  },

  stripeCustomersDeleteCard: function (user, index) {
    var stripeCustomerId = user.stripeCustomer.id;
    var cardId = user.stripeCustomer.cards.data[index].id;
    _StripeCustomers.deleteCard(stripeCustomerId, cardId);
    Meteor.call("usersUpdateStripeCustomer", user);
  },

  stripeCustomersRetrieve: function (stripeCustomerId) {
    return _StripeCustomers.retrieve(stripeCustomerId);
  },

  stripeCustomersDelete: function (user) {
    _StripeCustomers.del(user.stripeCustomer.id);
    Meteor.call("usersUpdateStripeCustomer", user);
  },

  usersUpdateStripeCustomer: function (user, _stripeCustomer) {
    console.log("USERS UPDATE STRIPE CUSTOM!!");
    var stripeCustomer = _stripeCustomer || Meteor.call("stripeCustomersRetrieve", user.stripeCustomer.id);
    console.log(stripeCustomer);
    if (!stripeCustomer.id || stripeCustomer.deleted) stripeCustomer = null;
    return Users.update({ _id: user._id }, { $set: { stripeCustomer: stripeCustomer } });
  }

});