const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { googleClientID, googleClientSecret } = require('../config/keys');
const mongoose = require('mongoose');
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
    },
    async (accessToken, refreshToken, profile, done) => {
      const foundUser = await User.findOne({ googleId: profile.id }).exec();

      if (foundUser) {
        // Existing user found, will not create new user
        return done(null, foundUser);
      }

      // Create new user if guard fails
      const newUser = await new User({ googleId: profile.id }).save();

      return done(null, newUser);
    }
  )
);
