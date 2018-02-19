import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
    // We'll put proxy settings to client\package.json
    // in order to this relative path get work properly in development envirenment
    // On production to heroku no need proxy, it'll work properly

    // Rather than returning an action from this action creator when ever the
    // action creator gets called, it'll instantly return a function
    // What is the key factor here?
    // When ww wired up the redux thunk middleware just like src\index.js as shown below;
    // const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
    // The purpose of reduxThunk (middleware) is to inspect what ever value we return
    // from this action creator. If redux thunk sees that we return a function
    // instead of a normal action, redux thunk will automatically call this function and
    // pass in that dispatch function as an argument
    // We can think of as like a big funnel, and anything we toss into it
    // (any action we toss into it ) will be automatically forwarded off to all the
    // different reducers in our application
    return function(dispatch) {
        // We want to dispatch an action after this request
        // has been successfully completed
        // That's the whole point of all this.
        axios
            .get('/api/current_user')
            .then(res => dispatch({ type: FETCH_USER, payload: res }));

        // This is the V-1 of our code. Whenever the action creators called
        // it will return a function. Redux thunk will see that we return to function
        // and it will automatically call it with the "dispatch".
        // We then make a request, we wait until we get the response back from our API
        // and then once we have the response only at that point in time
        //  will we actually dispatch our action
    };

    // We don't use this approach with redux thunk
    /*const request = axios.get('/api/current_user');
    return {
        type: FETCH_USER,
        payload: request
    };*/
};
