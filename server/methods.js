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
    if (this.userId && order.cartId) {
      return Orders.upsert({_id: order._id}, order);
    }
  },

  ordersRemove: function (orderId) {
    if (orderId) {
      return Orders.remove(orderId);
    } else {
      return Orders.remove({});
    }
  },

  stripeChargesCreate: function (amount, customerId, cart) {
    var charge = _StripeCharges.create({
      amount: amount,
      currency: "USD",
      customer: customerId
    });
    if (!charge.id) return charge;
    var updates = {
      active: false,
      status: "ordered",
      payment: {
        method: "stripe",
        chargeId: charge.id,
        amount: amount
      }
    };
    var cartUpdated = _.extend(cart, updates);
    console.log(charge);
    return Carts.upsert({_id: cart._id}, cartUpdated);
  },

  stripeCustomersCreate: function (user, token) {
    console.log("CREATING STRIPE CUSTOMER!!");
    var createdCustomer = _StripeCustomers.create({ card: token });
    console.log("CREATING STRIPE CUSTOMER: created customer: " + JSON.stringify(createdCustomer));
    return Meteor.call("usersUpdateStripeCustomer", user, createdCustomer);
  },

  stripeCustomersCreateCard: function (user, token) {
    var stripeCustomer = user && user.stripeCustomer;
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
    if (user) {
      var stripeCustomer = _stripeCustomer || Meteor.call("stripeCustomersRetrieve", user.stripeCustomer.id);
      if (!stripeCustomer.id || stripeCustomer.deleted) stripeCustomer = null;
      return Users.update({ _id: user._id }, { $set: { stripeCustomer: stripeCustomer } });
    } else {
      return _stripeCustomer;
    }

  },

  productPropertyRulesUpsert: function (rule, callback) {
    console.log("UPSERTING: " + JSON.stringify(rule));
    return ProductPropertyRules.upsert({_id: rule._id}, rule);
  },

  productPropertyRulesRemove: function (ProductPropertyRule) {
    return ProductPropertyRules.remove(ProductPropertyRule._id);
  },

  handleViewAction: function (action) {
    var key = action.key,
      type = action.actionType,
      payload = action.payload;
    AppDispatcher.dispatch(key, type, payload);
  }



});