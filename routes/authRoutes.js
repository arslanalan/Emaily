const passport = require('passport');

//app defined on index.js, so this is a trick used for refactoring the code
module.exports = app => {
    //Route handler
    //Try to login
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    //When user redirectec after login process
    app.get('/auth/google/callback', passport.authenticate('google'));

    //Test user authentication
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
