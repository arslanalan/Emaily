module.exports = (req, res, next) => {
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits!' });
        // Look here: "https://tools.ietf.org/html/rfc2616#section-10" for status codes
    }

    next();
};
