const passport = require('passport');
const mongoose = require('mongoose');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { googleClientID, googleClientSecret } = require('../config/keys');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
    .exec()
    .catch(err => console.error(err));

  if (user) {
    return done(null, user);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const foundUser = await User.findOne({ googleId: profile.id });

      // Return existing user if found, else create new user
      if (foundUser) {
        return done(null, foundUser);
      }

      const newUser = await new User({ googleId: profile.id }).save();
      return done(null, newUser);
    }
  )
);
