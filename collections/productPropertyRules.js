ProductPropertyRules = {};

_.extend(ProductPropertyRules, {
  build: function (productGroupId) {
    return {
      name: null,
      kind: "text",
      allowedValues: []
    };
  }
});

// Helpers.addPermissions(ProductPropertyRules);