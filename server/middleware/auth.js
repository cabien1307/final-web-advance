const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/token");

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token)
            return res.status(400).json({ msg: "Invalid Authentication" });

        JWT.verify(token, JWT_SECRET, (err, user) => {
            if (err)
                return res.status(400).json({ msg: "Invalid Authentication" });

            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

module.exports = auth;
