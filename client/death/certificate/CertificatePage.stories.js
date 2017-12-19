// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import appLayoutDecorator from '../../../storybook/app-layout-decorator';

import { CertificatePageContent } from './CertificatePage';

import {
  TYPICAL_CERTIFICATE,
  PENDING_CERTIFICATE,
} from '../../../fixtures/client/death-certificates';

storiesOf('CertificatePage', module)
  .addDecorator(appLayoutDecorator(true))
  .add('normal certificate', () => (
    <CertificatePageContent
      id={TYPICAL_CERTIFICATE.id}
      certificate={TYPICAL_CERTIFICATE}
      backUrl={'/search?q=Jayn'}
      addToCart={action('addToCart')}
    />
  ))
  .add('normal certificate — not from search', () => (
    <CertificatePageContent
      id={TYPICAL_CERTIFICATE.id}
      certificate={TYPICAL_CERTIFICATE}
      backUrl={null}
      addToCart={action('addToCart')}
    />
  ))
  .add('pending certificate', () => (
    <CertificatePageContent
      id={PENDING_CERTIFICATE.id}
      certificate={PENDING_CERTIFICATE}
      backUrl={'/search?q=Jayn'}
      addToCart={action('addToCart')}
    />
  ))
  .add('missing certificate', () => (
    <CertificatePageContent
      id="200001"
      certificate={null}
      backUrl={'/search?q=Jayn'}
      addToCart={action('addToCart')}
    />
  ));
