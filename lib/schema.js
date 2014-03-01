Stores = new Meteor.Collection("stores", {
  schema: new SimpleSchema({
    name: {
      type: String,
      label: "Name",
      unique: true
    },
    category: {
      type: String,
      label: "category"
    },
    active: {
      type: Boolean,
      label: "active"
    },
    description: {
      type: String,
      label: "description"
    },
    userId: {
      type: String,
      label: "user id"
    }
  })
});

ProductPropertyRuleSchema = new SimpleSchema({
  name: {
    type: String,
    label: "property name",
    optional: true
  },
  allowedType: {
    type: String,
    label: "property type",
    optional: true
  },
  allowedValues: {
    type: [String],
    label: "allowed values",
    optional: true
  },
  productGroupId: {
    type: String,
    label: "product group id"
  }
});

ProductGroupSchema = new SimpleSchema({
  name: {
    type: String,
    label: "name",
    unique: true
  },
  category: {
    type: String,
    label: "category"
  },
  description: {
    type: String,
    label: "description"
  }
  // productPropertyRules: {
  //   type: [ProductPropertyRuleSchema],
  //   label: "product property rules"
  // },
  // products: {
  //   type: ["ProductSchema"],
  //   label: "products",
  //   optional: true
  // },
  // storeId: {
  //   type: String,
  //   label: "store id",
  //   optional: true
  // }
});

ProductPropertySchema = new SimpleSchema({
  name: {
    type: String,
    label: "property name"
  },
  stringValue: {
    type: String,
    label: "string value",
    optional: true
  },
  numberValue: {
    type: Number,
    label: "number value",
    optional: true
  },
  booleanValue: {
    type: Boolean,
    label: "boolean value",
    optional: true
  },
  arrayValue: {
    type: [String, Number],
    label: "array value",
    optional: true
  }
});

ProductSchema = new SimpleSchema({
  productGroup: {
    type: [ProductGroupSchema],
    label: "product group"
  },
  name: {
    type: String,
    label: "product name"
  },
  properties: {
    type: [ProductPropertySchema],
    label: "product properties"
  }
});
