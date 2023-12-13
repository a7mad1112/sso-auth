require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cookieSession = require('express-session');
require('./passport-setup.js');
const app = express();

app.set('view engine', 'ejs');

app.use(
  cookieSession({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

app.get('/success', (req, res) => {
  if (req.user) {
    const {
      displayName: name = 'NotFound',
      emails: [{ value: email = 'NotFound' }],
      photos: [{ value: picture = 'NotFound' }],
    } = req.user;
    console.log({ name, email, picture });
    res.render('pages/profile.ejs', { name, email, picture });
  } else {
    // Handle the case where req.user is undefined or null
    res.status(401).send('Unauthorized');
  }
});

app.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'failed' }),
  (req, res) => {
    res.redirect('/success');
  }
);

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Error during logout');
    }
    res.redirect('/');
  });
});

app.listen(5000, () => {
  console.log('App is running on port 5000');
});
