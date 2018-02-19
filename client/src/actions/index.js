import axios from 'axios';
import { FETCH_USER } from './types';

// If you have one expression in arrow function like this
// you can remove curly brackets and return keyword
// instead of function keyword, used arrow function structure
// no need paranthesis when one argument exist
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res });
};
