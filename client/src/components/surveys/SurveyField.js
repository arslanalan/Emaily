// SurveyField contains logic to render a single
// label and text input
import React from 'react';

// meta: { error, touched } -> Look into the meta object,
// and give me the error, and touched property
export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
        // {touched && error} -> if touched true, then continue on error
        // <input {...input} is equal to
        // <input onBlur={input.onBlur} onChange={input.onChange} bla, bla
    );
};
