import { FETCH_USER } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_USER:
            // If action.payload is empty string return false,
            // if not return action.payload
            return action.payload || false;
        default:
            return state;
    }
}
