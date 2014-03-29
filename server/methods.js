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
      cart.subtotal = Carts.getSubtotal(cart);
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
  }
});