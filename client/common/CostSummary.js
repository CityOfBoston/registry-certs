// @flow

import React from 'react';
import { observer } from 'mobx-react';

import {
  calculateCreditCardCost,
  calculateDebitCardCost,
  CERTIFICATE_COST_STRING,
} from '../../lib/costs';
import type Cart from '../store/Cart';

type ServiceFeeType = 'CREDIT' | 'DEBIT';

type Props = {
  cart: Cart,
  serviceFeeType: ServiceFeeType,
  allowServiceFeeTypeChoice: boolean,
};

type State = {
  serviceFeeType: ServiceFeeType,
};

// Component to display the subtotal / service fee / shipping / total UI from
// the cart and order review screens.
@observer
export default class CostSummary extends React.Component<Props, State> {
  static defaultProps = {
    allowServiceFeeTypeChoice: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      serviceFeeType: props.serviceFeeType,
    };
  }

  handleCardOptionChanged = (ev: SyntheticInputEvent<*>) => {
    this.setState({
      serviceFeeType: (ev.target.value: any),
    });
  };

  calculateCost() {
    const { cart } = this.props;
    const { serviceFeeType } = this.state;

    return serviceFeeType === 'CREDIT'
      ? calculateCreditCardCost(cart.size)
      : calculateDebitCardCost(cart.size);
  }

  render() {
    const { cart } = this.props;
    const { total, subtotal, serviceFee } = this.calculateCost();

    return (
      <div className="clearfix">
        <table className="t--info ta-r" style={{ float: 'right' }}>
          <tbody>
            <tr>
              <td>
                {cart.size} {cart.size === 1 ? 'certificate' : 'certificates'} ×{' '}
                {CERTIFICATE_COST_STRING}
              </td>
              <td className="cost-cell">${(subtotal / 100).toFixed(2)}</td>
            </tr>

            <tr>
              <td>{this.renderServiceFeeLabel()}</td>
              <td className="cost-cell">${(serviceFee / 100).toFixed(2)}</td>
            </tr>

            <tr>
              <td>Shipping within the U.S.</td>
              <td className="cost-cell">
                <i>included</i>
              </td>
            </tr>

            <tr>
              <td className="sh-title">Total</td>
              <td className="cost-cell cost br br-t100 p-v200">
                ${(total / 100).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <style jsx>{`
          .clearfix:after {
            content: '';
            display: table;
            clear: both;
          }

          .cost-cell {
            width: 5em;
            vertical-align: bottom;
          }

          .sh-title {
            padding: 0;
            line-height: 1;
            font-style: normal;
          }
        `}</style>
      </div>
    );
  }

  renderServiceFeeLabel() {
    const { allowServiceFeeTypeChoice } = this.props;
    const { serviceFeeType } = this.state;

    if (allowServiceFeeTypeChoice) {
      return (
        <div>
          <div className="sel sel--thin" style={{ display: 'inline-block' }}>
            <div className="sel-c">
              <select
                id="serviceFeeTypeSelect"
                className="sel-f"
                onChange={this.handleCardOptionChanged}
                value={serviceFeeType}
              >
                <option value="CREDIT">Credit card</option>
                <option value="DEBIT">Debit card</option>
              </select>
            </div>
          </div>{' '}
          <label htmlFor="serviceFeeTypeSelect">
            service fee
            <a href="#service-fee">*</a>
          </label>
          <style jsx>{`
            label {
              white-space: nowrap;
            }

            .sel--thin .sel-f {
              height: 2rem;
              padding-right: 3rem;
            }

            .sel-c:after {
              width: 2rem;
            }
          `}</style>
        </div>
      );
    } else {
      switch (serviceFeeType) {
        case 'CREDIT':
          return (
            <span>
              Credit card service fee <a href="#service-fee">*</a>
            </span>
          );

        case 'DEBIT':
          return (
            <span>
              Debit card service fee <a href="#service-fee">*</a>
            </span>
          );

        default:
          throw new Error();
      }
    }
  }
}
