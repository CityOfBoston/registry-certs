// @flow

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import fullPageDecorator from '../../storybook/full-page-decorator';
import PaymentPage from './PaymentPage';

import { TYPICAL_CERTIFICATE, PENDING_CERTIFICATE, NO_DATE_CERTIFICATE } from '../../fixtures/client/death-certificates';

import Cart from '../store/Cart';

function makeCart() {
  const cart = new Cart();

  cart.add(TYPICAL_CERTIFICATE, 1);
  cart.add(PENDING_CERTIFICATE, 3);
  cart.add(NO_DATE_CERTIFICATE, 1);

  return cart;
}

storiesOf('PaymentPage', module)
  .addDecorator(fullPageDecorator)
  .add('normal page', () => (
    <PaymentPage cart={makeCart()} />
  ));