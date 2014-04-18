Stripe = StripeAPI('sk_test_9F2XPZgPyqV8o3KwYBUwtEjr');

_StripeCustomers = Async.wrap(Stripe.customers, ["retrieve", "del", "create", "createCard", "deleteCard"]);