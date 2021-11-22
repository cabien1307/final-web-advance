const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/token");
const User = require("../model/User");

const auth = (req, res, next) => {
    try {
        const tokenBearer = req.header("Authorization");
        if (!tokenBearer)
            return res.status(400).json({ msg: "Invalid Authentication" });
        const token = tokenBearer.replace("Bearer ", "");

        JWT.verify(token, JWT_SECRET, async (err, user) => {
            if (err)
                return res.status(400).json({ msg: "Invalid Authentication" });

            try {
                const u = await User.findById(user.sub.id);
                if (u.role !== 0)
                    return res
                        .status(500)
                        .json({ msg: "You dont have permission !" });

                next();
            } catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

module.exports = auth;
