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
        console.log(req.body);
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
