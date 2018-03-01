// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
// reduxForm helper allows our component to communicate with our redux store
// like connect helper on react-redux library
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

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
                    <button type="submit">Submit</button>
                </form>
            </div>
            // Instead of using component="input", a standard html input
            // you would write your own component, like
            // component="SurveyField", we'll apply this
        );
    }
}

// reduxForm here only takes one argument, an object with form property
// it's not same as connect helper
// connect helper takes more arguments
export default reduxForm({
    form: 'SurveyForm'
})(SurveyForm);
