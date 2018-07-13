import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';

const Payments = ({ handleToken }) => (
  <StripeCheckout
    name="Emaily"
    description="$5 for 5 email credits"
    amount={500}
    allowRememberMe={false}
    token={token => handleToken(token)}
    stripeKey={process.env.REACT_APP_STRIPE_KEY}
  >
    <input type="button" className="btn" value="Add Credits" />
  </StripeCheckout>
);

Payments.propTypes = { handleToken: PropTypes.func.isRequired };

export default connect(
  null,
  actions
)(Payments);
