// This regular expression is provided by http://emailregex.com/
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
    const invalidEmails = emails
        .split(',')
        // split() returns an array of emails
        // So, we use map function to trim each email in that array and
        // return a new array of trimmed emails
        .map(email => email.trim())
        // filter each email inside an array, and
        // return false if email is valid,
        // return true if email is invalid, and will be kept inside the array
        // At the end, invalid emails will remain inside the array
        .filter(email => re.test(email) === false);

    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }

    return;
};
