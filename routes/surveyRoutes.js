const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const validateSurveyInput = require('../validation/survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const router = express.Router();
const Survey = mongoose.model('survey');

// Get all surveys created by current user
router.get('/', requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id });

  if (!surveys.length) {
    return res.status(404).send({ error: 'No survey found!' });
  }

  res.send(surveys);
});

// Create survey and send out emails
router.post('/', requireLogin, requireCredits, async (req, res) => {
  const errors = validateSurveyInput(req.body);

  if (Object.keys(errors).length) return res.status(400).send(errors);

  const { recipients, ...surveyData } = req.body;
  const recipientsArray = recipients
    .split(', ')
    .map(email => ({ email: email.trim() }));

  if (req.user.credits - recipientsArray.length < 0) {
    return res.status(403).send({ error: 'You do not have enough credits' });
  }

  const survey = new Survey({
    ...surveyData,
    _user: req.user.id,
    recipients: recipientsArray,
  });

  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    await mailer.send();
    await survey.save();

    req.user.credits -= recipientsArray.length;
    const updatedUser = await req.user.save();

    res.send(updatedUser);
  } catch (error) {
    res.status(422).send(error);
  }
});

router.get('/feedback', (req, res) => {
  res.send('Thanks for voting!');
});

module.exports = router;
