const JWT = require('jsonwebtoken');
const User = require('../models/user');
const config = require('config');
const JWT_SECRET = config.get('JWT_SECRET');

signToken = user => {
  return JWT.sign(
    {
      iss: 'auth-api',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time +1 day ahead
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { name, email, password } = req.value.body;

    // Check if user-email already exist
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use.' });
    }
    // Create new user
    const newUser = new User({
      name,
      email,
      password
    });
    await newUser.save();

    // Generate token
    const token = signToken(newUser);

    // Response with token
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    //Generate Token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    res.json({ secret: 'resource' });
  }
};
