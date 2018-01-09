<img src="https://cloud.githubusercontent.com/assets/9234/19400090/8c20c53c-9222-11e6-937c-02bce55e5301.png" alt="City of Boston" width="150" />

The source code for ordering registry certificates online.

[![Build Status](https://travis-ci.org/CityOfBoston/registry-certs.svg?branch=develop)](https://travis-ci.org/CityOfBoston/registry-certs)
[![codecov](https://codecov.io/gh/CityOfBoston/registry-certs/branch/develop/graph/badge.svg)](https://codecov.io/gh/CityOfBoston/registry-certs)
[![Greenkeeper badge](https://badges.greenkeeper.io/CityOfBoston/registry-certs.svg)](https://greenkeeper.io/)

## Developers

This is a Node project using the [Next.js](https://github.com/zeit/next.js/)
framework for server-side rendering.

 * **Development Server**: `npm run dev` <http://localhost:3000/>
 * **React Storybook**: `npm run storybook` <http://localhost:9001/>
 * **Gulp**: `npx gulp watch`
 * **Tests**: `npx jest` or `npx jest --watch`
 * **Lint**: `npm run lint` (uses [ESLint](http://eslint.org/) `--fix` to fix common style errors)
 * **Typecheck**: `npx flow`

 ## Testing

You can use GraphiQL to run GraphQL queries against the backend: <http://localhost:3000/graphiql>

Test query for submitting an order:

```
mutation {
  submitDeathCertificateOrder(
    contactName: "Jyn Doe"
    contactEmail: "jyn@fake.com"
    contactPhone: "5551234567"
    shippingName: "Jyn Doe"
    shippingAddress1: "123 Fake St."
    shippingCity: "Boston"
    shippingState: "MA"
    shippingZip: "02210"
    cardToken: "tok_visa"
    cardLast4: "1234"
    cardholderName: "Jyn X. Doe"
    billingAddress1: "321 Faux Pl."
    billingAddress2: ""
    billingCity: "Boston"
    billingState: "MA"
    billingZip: "02211"
    idempotencyKey: "1234"
    items: [{
      id: "1234"
      name: "Robert Frost"
      quantity: 11
    }]
  ) {
    id
  } 
}
 ```