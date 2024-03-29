const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const GGToken = require("passport-google-token").Strategy;

const User = require("../model/User");

const { JWT_SECRET, auth } = require("../config/token/");

// Passport JWT
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
            secretOrKey: JWT_SECRET,
        },
        async (payload, done) => {
            try {
                const user = await User.findById(payload.sub.id)
                    .populate("listRolePost")
                    .populate("faculty");

                if (!user) return done(null, false);

                const {
                    password,
                    authType,
                    authFacebookID,
                    authTwitterID,
                    authGoogleID,
                    createdAt,
                    updatedAt,
                    ...others
                } = user._doc;
                
                done(null, others);
            } catch (error) {
                done(error, false);
            }
        }
    )
);

// Passport local
passport.use(
    new LocalStrategy(
        {
            usernameField: "email", //lay truong email de passport
        },
        async (email, passwordReq, done) => {
            try {
                const user = await User.findOne({
                    $and: [{ email }, { authType: "local" }],
                });

                if (!user) return done(null, false);

                const isValidPassword = await user.isValidPassword(passwordReq);
                if (!isValidPassword) return done(null, false);
                const {
                    password,
                    posts,
                    listRolePost,
                    authType,
                    authFacebookID,
                    authTwitterID,
                    authGoogleID,
                    createdAt,
                    updatedAt,
                    ...others
                } = user._doc;
                done(null, others);
            } catch (error) {
                done(error, false);
            }
        }
    )
);

// Passport Google
passport.use(
    new GGToken(
        {
            clientID: auth.google.CLIENT_ID,
            clientSecret: auth.google.CLIENT_SECRET,
        },
        async (accessToken, refreshToken, profile, done) => {
            if (!profile.emails[0].value.includes("@student.tdtu.edu.vn") || !profile.emails[0].value.includes("@tdtu.edu.vn")) {
                done(null, false);
            } else {
                try {
                    // Check whether this current user exist in db
                    const user = await User.findOne({
                        authGoogleID: profile.id,
                        authType: "google",
                    });

                    // user has logged in before
                    if (user) {
                        const {
                            posts,
                            listRolePost,
                            authType,
                            authFacebookID,
                            authTwitterID,
                            authGoogleID,
                            ...others
                        } = user._doc;
                        return done(null, others);
                    }

                    // user first logged in  (new account)
                    const newUser = new User({
                        authType: "google",
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        authGoogleID: profile.id,
                        profilePic: profile._json.picture,
                    });

                    await newUser.save();
                    const {
                        listRolePost,
                        authType,
                        authFacebookID,
                        authTwitterID,
                        authGoogleID,
                        ...others
                    } = newUser._doc;

                    done(null, others);
                } catch (error) {
                    done(error, false);
                }
            }
        }
    )
);
