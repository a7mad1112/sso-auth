const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

passport.serializeUser((user, doneCallback) => {
  doneCallback(null, user);
});
passport.deserializeUser((user, doneCallback) => {
  doneCallback(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, doneCallback) => {
      console.log(profile);
      return doneCallback(null, profile);
    }
  )
);
