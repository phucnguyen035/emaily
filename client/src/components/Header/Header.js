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
            <li style={{ textAlign: 'center' }}>
              <Payments />
            </li>
            <li style={{ margin: '0 10px', cursor: 'default' }} id="credits">
              Credits: <strong>{auth.credits}</strong>
            </li>
            <li style={{ margin: '0 10px' }} id="logout">
              <a href="/auth/logout">Logout</a>
            </li>
          </Fragment>
        );
    }
  };

  return (
    <Fragment>
      <nav>
        <div className="nav-wrapper indigo">
          <a href="#" data-target="mobile" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>

          <div className="container">
            <Link to={auth ? '/surveys' : '/'} className="brand-logo">
              Emaily
            </Link>

            <ul className="right hide-on-med-and-down">{renderContent()}</ul>
          </div>
        </div>
      </nav>

      <ul className="sidenav center" id="mobile">
        {renderContent()}
      </ul>
    </Fragment>
  );
};

Header.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.bool])
};

Header.defaultProps = {
  auth: null
};

export default connect(mapStateToProps)(Header);
