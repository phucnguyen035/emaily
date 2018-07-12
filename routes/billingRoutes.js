const express = require('express');
const { stripeSecret } = require('../config/keys');
const stripe = require('stripe')(stripeSecret);
const requireLogin = require('../middlewares/requireLogin');

const router = express.Router();

router.post('/', requireLogin, async (req, res) => {
  await stripe.charges
    .create({
      amount: 500,
      currency: 'USD',
      description: '$5 for 5 credits',
      source: req.body.id,
    })
    .catch(err => console.error(err));

  req.user.credits += 5;

  const updatedUser = await req.user.save();

  res.send(updatedUser);
});

module.exports = router;
