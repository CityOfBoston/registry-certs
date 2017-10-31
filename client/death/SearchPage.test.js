// @flow
import React from 'react';
import { shallow } from 'enzyme';

import Router from 'next/router';

import type { DeathCertificate, DeathCertificateSearchResults } from '../types';
import DeathCertificatesDao from '../dao/DeathCertificatesDao';
import Cart from '../store/Cart';

import { wrapSearchPageController, SearchPageContent } from './SearchPage';

import {
  TYPICAL_CERTIFICATE,
  PENDING_CERTIFICATE,
  NO_DATE_CERTIFICATE,
} from '../../fixtures/client/death-certificates';

jest.mock('next/router');
jest.mock('../dao/DeathCertificatesDao');

const TEST_DEATH_CERTIFICATES: DeathCertificate[] = [
  TYPICAL_CERTIFICATE,
  PENDING_CERTIFICATE,
  NO_DATE_CERTIFICATE,
];

const TEST_SEARCH_RESULTS: DeathCertificateSearchResults = {
  results: TEST_DEATH_CERTIFICATES,
  resultCount: 50,
  page: 0,
  pageSize: 5,
  pageCount: 10,
};

describe('controller', () => {
  describe('getInitialProps', () => {
    let SearchPageController;
    let deathCertificatesDao;

    beforeEach(() => {
      deathCertificatesDao = new DeathCertificatesDao((null: any));

      const dependencies: any = { deathCertificatesDao };
      SearchPageController = wrapSearchPageController(
        () => dependencies,
        () => null
      );
    });

    it('works with no query', async () => {
      const initialProps = await SearchPageController.getInitialProps(
        ({ query: {} }: any)
      );

      expect(initialProps).toMatchSnapshot();
    });

    it('searches when given a query', async () => {
      deathCertificatesDao.search.mockReturnValue(TEST_SEARCH_RESULTS);

      const initialProps = await SearchPageController.getInitialProps(
        ({ query: { q: 'Monkey Joe' } }: any)
      );

      expect(initialProps).toMatchSnapshot();
      expect(deathCertificatesDao.search).toHaveBeenCalledWith('Monkey Joe', 1);
    });
  });

  describe('operations', () => {
    let controller;

    beforeEach(() => {
      const SearchPageController = wrapSearchPageController(
        () => ({}: any),
        () => null
      );

      controller = new SearchPageController(({}: any));
    });

    describe('submitSearch', () => {
      it('redirects to search for a query', () => {
        controller.submitSearch('Monkey Joe');
        expect(Router.push).toHaveBeenCalledWith('/death?q=Monkey%20Joe');
      });

      it('trims the query', () => {
        controller.submitSearch('Monkey Joe   ');
        expect(Router.push).toHaveBeenCalledWith('/death?q=Monkey%20Joe');
      });
    });
  });
});

describe('content', () => {
  let wrapper;
  let submitSearch;

  beforeEach(() => {
    submitSearch = jest.fn();

    wrapper = shallow(
      <SearchPageContent
        cart={new Cart()}
        query={'Jayne Doe'}
        page={1}
        results={null}
        submitSearch={submitSearch}
      />
    );
  });

  it('defaults to the passed-in query', () => {
    const queryField = wrapper.find('input[name="q"]');
    expect(queryField.prop('value')).toEqual('Jayne Doe');
  });

  it('changes query input and submits it', () => {
    const form = wrapper.find('form');
    const queryField = wrapper.find('input[name="q"]');

    queryField.simulate('change', { target: { value: 'Monkey Joe' } });
    form.simulate('submit', { preventDefault: jest.fn() });

    expect(submitSearch).toHaveBeenCalledWith('Monkey Joe');
  });
});
