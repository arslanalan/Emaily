// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
// reduxForm helper allows our component to communicate with our redux store
// like connect helper on react-redux library
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';

class SurveyForm extends Component {
    renderFields() {
        return (
            <div>
                <Field
                    label="Survey Title"
                    type="text"
                    name="title"
                    component={SurveyField}
                />
                <Field
                    label="Subject Line"
                    type="text"
                    name="subject"
                    component={SurveyField}
                />
                <Field
                    label="Email Body"
                    type="text"
                    name="body"
                    component={SurveyField}
                />
                <Field
                    label="Recipient List"
                    type="text"
                    name="emails"
                    component={SurveyField}
                />
            </div>
        );
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
