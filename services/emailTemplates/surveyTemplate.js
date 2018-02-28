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
                        <a href="http://localhost:3000">Yes</a>
                    </div>
                    <div>
                        <a href="http://localhost:3000">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};
