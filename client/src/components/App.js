import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';
import * as actions from '../actions';
import Header from './Header/Header';
import Landing from './Landing';
import Dashboard from './Dashboard/Dashboard';
import SurveyNew from './Surveys/SurveyNew';
import Loading from './Loading';

class App extends PureComponent {
  componentDidMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }

  render() {
    const { auth } = this.props;

    return (
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            {auth === null ? (
              <Loading />
            ) : (
              <Switch>
                <PublicRoute exact path="/" component={Landing} />
                <PrivateRoute exact path="/surveys" component={Dashboard} />
                <PrivateRoute path="/surveys/new" component={SurveyNew} />
              </Switch>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

App.defaultProps = { auth: null };

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  actions
)(App);
