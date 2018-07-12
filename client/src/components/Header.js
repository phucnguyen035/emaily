import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Payments from './Payments';

const mapStateToProps = ({ auth }) => ({ auth });

const Header = ({ auth }) => {
  const renderContent = () => {
    switch (auth) {
      case null:
        return null;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );

      default:
        return (
          <Fragment>
            <li>
              <Payments />
            </li>
            <li style={{ margin: '0 10px', cursor: 'default' }}>
              Credits: <strong>{auth.credits}</strong>
            </li>
            <li>
              <a href="/auth/logout">Logout</a>
            </li>
          </Fragment>
        );
    }
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <div className="container">
          <Link to={auth ? '/surveys' : '/'} className="left brand-logo">
            Emaily
          </Link>
          <ul className="right">{renderContent()}</ul>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.bool])
};

Header.defaultProps = {
  auth: null
};

export default connect(mapStateToProps)(Header);
