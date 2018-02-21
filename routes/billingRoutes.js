const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
    // We define amount again here
    // We use req.body thanks to the body-parser npm module
    app.post('/api/stripe', async (req, res) => {
        if (!req.user) {
            // Set response status to "401", and send error message.
            return res.status(401).send({ error: 'You must log in!' });
        }

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        // When a request is made, it will send the cookie with identifying info inside.
        // This identifying piece of info is passed into deserializeUser to turn it into a user model instance.
        // i.e use cookie info to check for user in DB.
        // So after deserializeUser, req.user is added to the request object.

        req.user.credits += 5;
        // This request is asyncronous, takes some amount of time
        // So, we use "await"
        // After successfully completed the save process,
        // It'll return the updated user model
        const user = await req.user.save();

        // Return the updated user
        // We could also returned the "req.user", but it could had been changed
        // on db, so we take fresh user model "user"
        res.send(user);
    });
};
