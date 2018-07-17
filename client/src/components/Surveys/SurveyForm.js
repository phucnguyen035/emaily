// SurveyNew shows a form for user
import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import SurveyField from './SurveyField';
import validateEmails from '../../misc/validateEmails';
import formFields from './formFields';
import * as actions from '../../actions';

let SurveyForm = ({ handleSubmit, showFormReview, pristine, submitting, error }) => {
  const renderField = () => formFields.map(({ name, label }) => (
    <Field key={name} type="text" name={name} component={SurveyField} label={label} />
  ));

  const validateSurvey = async (data) => {
    try {
      await axios.post('/api/surveys', data);

      showFormReview();
    } catch (submitError) {
      throw new SubmissionError({ _error: submitError.response.data });
    }
  };

  return (
    <div>
      <h3 className="center-align">Survey Form</h3>
      <form onSubmit={handleSubmit(data => validateSurvey(data))}>
        {renderField()}

        {error && <strong className="red-text">{error}</strong>}

        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/surveys" className="btn pink">
            <i className="material-icons left">arrow_back</i>
            Cancel
          </Link>

          <button type="submit" className="btn indigo darken-3" disabled={pristine || submitting}>
            Next
            <i className="material-icons right">arrow_forward</i>
          </button>
        </div>
      </form>
    </div>
  );
};

SurveyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  showFormReview: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.arrayOf(PropTypes.any)
};

SurveyForm.defaultProps = { error: undefined };

const validate = (values) => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = 'This field must not be empty!';
    }
  });

  return errors;
};

SurveyForm = connect(
  null,
  actions
)(SurveyForm);

export default reduxForm({ validate, form: 'surveyForm', destroyOnUnmount: false })(
  withRouter(SurveyForm)
);
