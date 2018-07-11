import axios from 'axios';
import { FETCH_USER } from '../constants';

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get('/api/current_user');

  return dispatch({
    type: FETCH_USER,
    payload: response.data
  });
};
