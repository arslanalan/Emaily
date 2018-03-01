// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
// reduxForm helper allows our component to communicate with our redux store
// like connect helper on react-redux library
import { reduxForm } from 'redux-form';

class SurveyForm extends Component {
    render() {
        return <div>SurveyForm!</div>;
    }
}

// reduxForm here only takes one argument, an object with form property
// it's not same as connect helper
// connect helper takes more arguments
export default reduxForm()(SurveyForm);
