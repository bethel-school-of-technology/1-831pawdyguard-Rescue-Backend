const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
    const token = req.headers.authorization.split("")[1];
    jwt.verify(token, "secret_phrase_for_creating_hashes");
    next();
    } catch (error) {
        res.status(401).json({message: "Auth Failed!"});
    } 
 };
