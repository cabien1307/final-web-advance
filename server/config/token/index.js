module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACTIVATION: process.env. ACTIVATION_TOKEN_SECRET,
    auth: {
        google: {
            CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
        },
        facebook: {
            CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
            CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET
        }
    }
}