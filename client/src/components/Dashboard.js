import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
  <Fragment>
    <h3>Welcome to the dashboard!</h3>

    <div className="fixed-action-btn">
      <Link
        to="/surveys/new"
        className="waves-effect waves-circle waves-light btn-floating btn-large pink"
      >
        <i className="material-icons">add</i>
      </Link>
    </div>
  </Fragment>
);

export default Dashboard;
