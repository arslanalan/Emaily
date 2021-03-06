import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
//we'll pass reducers to store instead of "() => []"
import reducers from './reducers';

// Development only axios helpers!
import axios from 'axios';
window.axios = axios;

//Create store with single dumy reducer that returns an array, we're going to replace it
//we come back, and changed "() => []" with "reducers"
// and pass an empty object to store, it's relevant to back-end,
// so in this case just pass an empty object
// and finaly pass applyMiddleware() as a third parameter
// We don't have any middleware now, we'll come back and modify this
// We come back, and passed reduxThunk as a middleware
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
