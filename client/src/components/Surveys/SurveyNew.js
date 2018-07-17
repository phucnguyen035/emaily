// SurveyNew shows SurveyForm AND SurveyFormReview
import React, { PureComponent, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends PureComponent {
  state = {
    hasSubmitted: false
  };

  showFormReview = () => {
    this.setState(() => ({ hasSubmitted: true }));
  };

  handleCancel = () => {
    this.setState(() => ({ hasSubmitted: false }));
  };

  render() {
    const { hasSubmitted } = this.state;

    return (
      <Fragment>
        {hasSubmitted ? (
          <SurveyFormReview handleCancel={this.handleCancel} />
        ) : (
          <SurveyForm showFormReview={this.showFormReview} />
        )}
      </Fragment>
    );
  }
}

export default reduxForm({ form: 'surveyForm' })(SurveyNew);
