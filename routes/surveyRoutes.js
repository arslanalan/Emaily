const _ = require('lodash');
const Path = require('path-parser').default;
// or const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const events = _.map(req.body, ({ email, url }) => {
            //extract the path as "/api/surveys/surveyID/choice"
            const pathname = new URL(url).pathname;
            const p = new Path('/api/surveys/:surveyId/:choice');
            // match will either be an object, or null
            const match = p.test(pathname);
            if (match) {
                return {
                    email,
                    surveyId: match.surveyId,
                    choice: match.choice
                };
            }
        });

        // Remove elements that are undefined
        const compactEvents = _.compact(events);
        // Remove dublicate elements, same email and same surveyId
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

        console.log(uniqueEvents);

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients
                .split(',')
                .map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Great place to send an email!
        // Mailer: first argument is an object with subject, and recipients argument
        // second argument is a template with survey.body
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            // We send back updated user model
            // So, Header will be rerendered with the updated credits info
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};

//recipients: recipients.split(',').map(email => { return { email: email }})
