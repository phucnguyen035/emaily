import React, { PureComponent, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUser } from '../actions/authActions';
import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

const mapDispatchToProps = dispatch => ({ handleFetchUser: () => dispatch(fetchUser()) });

class App extends PureComponent {
  componentDidMount() {
    const { handleFetchUser } = this.props;

    handleFetchUser();
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  handleFetchUser: PropTypes.func.isRequired
};

export default connect(
  undefined,
  mapDispatchToProps
)(App);
