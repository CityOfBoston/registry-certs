// @flow

import React from 'react';
import { computed, action, observable } from 'mobx';
import { observer } from 'mobx-react';

import type Cart, { CartEntry } from '../../store/Cart';

import {
  GRAY_100,
  GRAY_300,
  OPTIMISTIC_BLUE,
} from '../../common/style-constants';

export type Props = {
  cart: Cart,
  entry: CartEntry,
};

@observer
export default class CheckoutItem extends React.Component<Props> {
  @observable quantityHasFocus: boolean = false;

  @computed
  get quantityValue(): string {
    const { entry: { quantity } } = this.props;

    if (quantity === 0) {
      return this.quantityHasFocus ? '' : '0';
    } else {
      return quantity.toString();
    }
  }

  handleQuanityFocus = action(() => {
    this.quantityHasFocus = true;
  });

  handleQuanityBlur = action(() => {
    this.quantityHasFocus = false;
  });

  handleQuantityChange = (ev: SyntheticInputEvent<*>) => {
    const { cart, entry } = this.props;

    const value = ev.target.value;

    if (value === '') {
      cart.setQuantity(entry.id, 0);
    } else {
      const quantity = parseInt(value, 10);
      if (!isNaN(quantity)) {
        cart.setQuantity(entry.id, quantity);
      }
    }
  };

  handleRemove = () => {
    const { cart, entry } = this.props;
    cart.remove(entry.id);
  };

  render() {
    const { entry: { cert } } = this.props;

    if (!cert) {
      return null;
    }

    const { firstName, lastName, deathDate, deathYear, id } = cert;

    return (
      <div className="p-a300 result">
        <input
          aria-label="Quantity"
          value={this.quantityValue}
          onChange={this.handleQuantityChange}
          onFocus={this.handleQuanityFocus}
          onBlur={this.handleQuanityBlur}
          className="br br-a150 quantity-box"
        />

        <div className="certificate-info">
          <div>
            {firstName} {lastName}
          </div>
          <div style={{ fontStyle: 'italic' }}>
            {deathDate || deathYear}
            <span className="id-label">ID:</span> {id}
          </div>
        </div>

        <button type="button" onClick={this.handleRemove}>
          X
        </button>

        <style jsx>{`
          .result {
            background: white;
            border-top: 2px solid ${GRAY_100};
            display: flex;
            align-items: center;
          }

          .quantity-box {
            width: 2.5rem;
            height: 2.5rem;
            margin-right: 1rem;
            font-family: inherit;
            font-style: italic;
            font-size: 1rem;
            background: ${OPTIMISTIC_BLUE};
            color: white;
            text-align: right;
            padding: 0.5rem;
          }

          .certificate-info {
            flex: 1;
          }

          .id-label {
            color: ${GRAY_300};
            padding-left: 1em;
          }
        `}</style>
      </div>
    );
  }
}
