import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './SurveyList';

const Dashboard = () => (
  <Fragment>
    <h4 className="center indigo-text darken-3">Dashboard</h4>

    <SurveyList />

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
