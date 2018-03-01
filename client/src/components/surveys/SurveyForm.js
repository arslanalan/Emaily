// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
// reduxForm helper allows our component to communicate with our redux store
// like connect helper on react-redux library
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'emails' }
];

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field
                    key={name}
                    component={SurveyField}
                    type="text"
                    label={label}
                    name={name}
                />
            );
        });
    }

    render() {
        // When you type text to "surveyTitle" field,
        // reduxForm takes the value typed, and
        // keep it in redux store with the key "surveyTitle"
        return (
            // handleSubmit() function here is automatically provided to us by reduxForm
            <div>
                <form
                    onSubmit={this.props.handleSubmit(values =>
                        console.log(values)
                    )}
                >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="teal btn-flat right white-text"
                    >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
            // Instead of using component="input", a standard html input
            // you would write your own component, like
            // component="SurveyField", we'll apply this
        );
    }
}

function validate(values) {
    const errors = {};

    // validation will automatically run one time at boot of app
    // So, no values, and it'll throw an error of undefined
    // So, we send empty string if values is undefined to get ride of error
    errors.emails = validateEmails(values.emails || '');

    _.each(FIELDS, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    // If returns an empty object,
    // redux form assumes no error exist in form
    // if error object not empty, redux form stop the submit process
    return errors;
}

// reduxForm here only takes one argument, an object with form property
// it's possible to add validate property within this object
// When user submit the form, validate function will be automatically called
// it's not same as connect helper
// connect helper takes more arguments
export default reduxForm({
    validate,
    form: 'SurveyForm'
})(SurveyForm);
