// Survey field contains logic to render a single label and text input
import React from 'react';
import PropTypes from 'prop-types';

const SurveyField = ({ input, type, info, label, meta: { touched, error } }) => (
  <div style={{ marginBottom: '10px' }}>
    <label htmlFor={input.name}>
      {label} <span className="red-text">*</span>
    </label>

    <input {...input} type={type} id={input.name} />
    {info && <small style={{ fontSize: '.8rem' }}>{info}</small>}

    {touched
      && error && (
        <p>
          <strong className="red-text">{error}</strong>
        </p>
    )}
  </div>
);

SurveyField.propTypes = {
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  info: PropTypes.string,
  label: PropTypes.string.isRequired,
  meta: PropTypes.objectOf(PropTypes.any).isRequired
};

SurveyField.defaultProps = { info: undefined };

export default SurveyField;
