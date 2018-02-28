const keys = require('../../config/keys');

module.exports = survey => {
    // With `` characters we can write multiline html in javascript
    // and no need escape characters
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>I'd like your input!</h3>
                    <p>Please answer the following question:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${
                            keys.redirectDomain
                        }/api/surveys/thanks">Yes</a>
                    </div>
                    <div>
                        <a href="${
                            keys.redirectDomain
                        }/api/surveys/thanks">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};
