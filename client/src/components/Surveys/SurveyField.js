// Survey field contains logic to render a single label and text input
import React from 'react';
import PropTypes from 'prop-types';

const SurveyField = ({ input, type, label, meta: { touched, error } }) => (
  <div style={{ marginBottom: '10px' }}>
    <label htmlFor={input.name}>
      {label} <span className="red-text">*</span>
    </label>

    <input {...input} type={type} id={input.name} />
    {touched && error && <strong className="red-text">{error}</strong>}
  </div>
);

SurveyField.propTypes = {
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SurveyField;
