const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    // We define amount again here
    // We use req.body thanks to the body-parser npm module
    // requireLogin middleware will be called before the actual request handler body
    // We didn't invoke requireLogin(), It's a function, yes, but we're not calling it like this
    // We're not calling it right now, because we don't want to run requireLogin middleware
    // the instant express loads up, or we execute inside of our terminal and run this code
    // for the very first time. We're doing right here is;
    // Hey express any time someone makes a post request to this route, here's a reference
    // to a function to run whenever a request comes in.
    // So, express takes the reference to this function, and express will call
    // it internally or call it itself whenever some request comes into the application.
    app.post('/api/stripe', requireLogin, async (req, res) => {
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
