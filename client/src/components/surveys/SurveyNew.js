// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    /*constructor(props) {
        super(props);

        this.state = { new: true };
    }*/

    // This state initialization is completely same as shown above
    // with babel plugin
    // state = { new: true };

    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return (
                <SurveyFormReview
                    onCancel={() => this.setState({ showFormReview: false })}
                />
            );
        }

        return (
            <SurveyForm
                onSurveySubmit={() => this.setState({ showFormReview: true })}
            />
        );
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default reduxForm({
    form: 'SurveyForm'
})(SurveyNew);

// We did not keep the option "destroyOnUnmount: false"
// which added in SurveyForm.js component
// So, when SurveyNew component re-rendered
// the data included dumped
// this is tricky way
