module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!' });
    }

    // What "next()" does? Pass to next middleware in the chain
    // At the end, the purpose of this middleware:
    // if user not logged in, response an error
    // else if user logged in, pass to the next middleware in the chain
    next();
};
