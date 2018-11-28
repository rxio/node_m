function authenticator (req, res, next) {
    console.log("Authenticating... ");
    res.send("Authenticating... ")
    next();
}

module.exports = authenticator;