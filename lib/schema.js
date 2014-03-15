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

ProductPropertyRuleDenormSchema = new SimpleSchema({
  name: {
    type: String,
    label: "property name"
  },
  kind: {
    type: String,
    label: "property type"
  },
  allowedValues: {
    type: [String],
    label: "allowed values",
    optional: true
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
  },
  productPropertyRules: {
    type: [ProductPropertyRuleDenormSchema],
    label: "product property rules"
  },
  storeId: {
    type: String,
    label: "store id"
  }
});

ProductPropertySchema = new SimpleSchema({
  name: {
    type: String,
    label: "property name"
  },
  textValue: {
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
  productGroupId: {
    type: String,
    label: "product group id"
  },
  slug: {
    type: String,
    label: "slug",
    optional: true
  },
  price: {
    type: Number,
    label: "price"
  },
  properties: {
    type: [ProductPropertySchema],
    label: "properties"
  },
  images: {
    type: [String],
    optional: true
  }
});