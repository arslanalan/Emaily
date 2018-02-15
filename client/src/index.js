import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';

//Create store with single dumy reducer that returns an array, we're going to replace it
// and pass an empty object to reducer, it's relevant to back-end,
// so in this case just pass an empty object
// and finaly pass applyMiddleware() as a thirth parameter
// We don't have any middleware now, we'll come back and modify this
const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
