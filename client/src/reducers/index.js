import { combineReducers } from 'redux';
// import reducer automatically created for us by redux-form
// we renamed reducer to reduxForm to make more sense
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm
});

// "form" is a special key for redux-form, not change it
