import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends PureComponent {
  componentDidMount() {
    const { fetchSurveys } = this.props;

    fetchSurveys();
  }

  renderSurveys() {
    const { surveys } = this.props;

    return surveys.reverse().map(({ _id, title, body, dateSent, yes, no }) => (
      <div className="card darken-1" key={_id} style={{ cursor: 'default' }}>
        <div className="card-content">
          <span className="card-title">
            <strong className="indigo-text darken-3">{title}</strong>
          </span>

          <p>{body}</p>

          <p className="right">
            Created on: <strong>{new Date(dateSent).toLocaleDateString('en-GB')}</strong>
          </p>
        </div>
        <div className="card-action">
          <a href="#" className="green-text">
            Yes: <strong>{yes}</strong>
          </a>

          <a href="#" className="pink-text">
            No: <strong>{no}</strong>
          </a>

          <a href="#" className="indigo-text">
            Ratio:{' '}
            <strong>{((yes || no) && `${((yes / (yes + no)) * 100).toFixed(2)}%`) || 'N/A'}</strong>
          </a>
        </div>
      </div>
    ));
  }

  render() {
    return <Fragment>{this.renderSurveys()}</Fragment>;
  }
}

SurveyList.propTypes = {
  fetchSurveys: PropTypes.func.isRequired,
  surveys: PropTypes.arrayOf(PropTypes.object)
};

SurveyList.defaultProps = { surveys: PropTypes.array };

const mapStateToProps = ({ surveys }) => ({ surveys });

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
