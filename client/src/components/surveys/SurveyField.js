// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({ input, label }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} />
        </div>
        // <input {...input} is equal to
        // <input onBlur={input.onBlur} onChange={input.onChange} bla, bla
    );
};
