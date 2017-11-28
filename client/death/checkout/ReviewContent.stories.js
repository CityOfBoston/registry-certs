// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Cart from '../../store/Cart';
import Order from '../../models/Order';

import appLayoutDecorator from '../../../storybook/app-layout-decorator';

import ReviewContent from './ReviewContent';

import {
  TYPICAL_CERTIFICATE,
  PENDING_CERTIFICATE,
  NO_DATE_CERTIFICATE,
} from '../../../fixtures/client/death-certificates';

function makeCart() {
  const cart = new Cart();

  cart.add(TYPICAL_CERTIFICATE, 1);
  cart.add(PENDING_CERTIFICATE, 3);
  cart.add(NO_DATE_CERTIFICATE, 1);

  return cart;
}

function makeOrder(overrides = {}) {
  return new Order({
    storeContactAndShipping: true,
    storeBilling: false,

    contactName: 'Squirrel Girl',
    contactEmail: 'squirrel.girl@avengers.org',
    contactPhone: '(555) 123-9999',

    shippingName: 'Doreen Green',
    shippingCompanyName: 'Empire State University',
    shippingAddress1: 'Dorm Hall, Apt 5',
    shippingAddress2: '10 College Avenue',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '12345',

    cardholderName: 'Nancy Whitehead',
    cardToken: 'tok_testtoken',
    cardLast4: '4040',

    billingAddressSameAsShippingAddress: false,

    billingAddress1: '3 Avengers Towers',
    billingAddress2: '',
    billingCity: 'New York',
    billingState: 'NY',
    billingZip: '12223',

    ...overrides,
  });
}

storiesOf('ReviewContent', module)
  .addDecorator(appLayoutDecorator(null))
  .add('default', () => (
    <ReviewContent
      cart={makeCart()}
      order={makeOrder()}
      submit={action('submit')}
    />
  ))
  .add('submission error', () => (
    <ReviewContent
      cart={makeCart()}
      order={(() => {
        const order = makeOrder();
        order.processingError = 'The order could not be processed.';

        return order;
      })()}
      submit={action('submit')}
      showErrorsForTest
    />
  ));
