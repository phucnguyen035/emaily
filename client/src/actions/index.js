import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from '../types';

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get('/auth/current_user');

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const handleToken = token => async (dispatch) => {
  const response = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const createSurvey = (formValues, history) => async (dispatch) => {
  try {
    const response = await axios.post('/api/surveys', formValues);

    dispatch({ type: FETCH_USER, payload: response.data });

    history.push('/surveys');
  } catch (error) {
    throw error;
  }
};

export const fetchSurveys = () => async (dispatch) => {
  const response = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: response.data });
};
