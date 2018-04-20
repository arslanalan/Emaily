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
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map(({ email, url }) => {
                // match will either be an object, or null
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return {
                        email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                //find and update record which match the specified below
                Survey.updateOne(
                    {
                        // in mongo query ids are specified as _id
                        _id: surveyId,
                        recipients: {
                            // $elemMatch is a mongo operator
                            $elemMatch: { email: email, responded: false }
                        }
                    },
                    {
                        // [choice] wil be 'yes' or 'no'
                        // so 'yes' or 'no' property will be incremented 1
                        $inc: { [choice]: 1 },
                        // 'recipients.$.responded' $ specify the current record
                        $set: { 'recipients.$.responded': true },
                        // $inc and $set are a mongo operators
                        lastResponded: new Date()
                    }
                ).exec(); //exec() means execute the query, it's required
            })
            .value();

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
