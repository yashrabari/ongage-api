const passport = require('passport');

require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;

// used to serialize the user for the session
passport.serializeUser(function (user: any, done: any) {
    done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (user: any, done: any) {
    done(null, user);
});

//Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
}, (request: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
    console.log(profile)
    done(null, profile)
}));

//facebook strategy
passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET_ID,
    callbackURL: "http://localhost:3000/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']

},// facebook will send back the token and profile
    function (token: any, refreshToken: any, profile: any, done: any) {

        console.log(profile)
        return done(null, profile)
    }));
