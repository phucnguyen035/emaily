import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { handleToken } from '../actions/authActions';

const mapDispatchToProps = { onToken: handleToken };

const Payments = ({ onToken }) => (
  <StripeCheckout
    name="Emaily"
    description="$5 for 5 email credits"
    amount={500}
    allowRememberMe={false}
    token={token => onToken(token)}
    stripeKey={process.env.REACT_APP_STRIPE_KEY}
  >
    <input type="button" className="btn" value="Add Credits" />
  </StripeCheckout>
);

Payments.propTypes = { onToken: PropTypes.func.isRequired };

export default connect(
  null,
  mapDispatchToProps
)(Payments);
