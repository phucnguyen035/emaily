// Show users their form input for review
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ handleCancel, formValues, createSurvey, history }) => {
  const reviewFields = () => formFields.map(({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <p>
        <strong>{formValues[name]}</strong>
      </p>
    </div>
  ));

  return (
    <div className="container">
      <h3 className="center">Review Phase</h3>
      <p className="center">Review your inputs before sending</p>

      {reviewFields()}

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <button type="button" className="btn pink" onClick={handleCancel}>
          <i className="material-icons left">arrow_back</i>
          Back
        </button>

        <button
          type="submit"
          className="btn indigo darken-3"
          onClick={() => createSurvey({ ...formValues, validated: true }, history)}
        >
          Send
          <i className="material-icons right">check</i>
        </button>
      </div>
    </div>
  );
};

SurveyFormReview.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  formValues: PropTypes.objectOf(PropTypes.any).isRequired,
  createSurvey: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = ({
  form: {
    surveyForm: { values }
  }
}) => ({ formValues: values });

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
