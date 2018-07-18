import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => (!auth ? <Component {...props} /> : <Redirect to="/surveys" />)}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

PrivateRoute.defaultProps = { auth: null };

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(PrivateRoute);
