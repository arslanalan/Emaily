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
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    //Logout user
    app.get('/api/logout', (req, res) => {
        req.logout();
        //Send response. Prove of user no longer signed in
        res.send(req.user);
    });

    //Test user authentication
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
