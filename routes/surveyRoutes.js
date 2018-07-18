const express = require('express');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const validateSurveyInput = require('../validation/survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const { URL } = require('url');
const Path = require('path-parser').default;

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

  // Get recipients to transform into array
  const { recipients, ...surveyData } = req.body;
  const recipientsArray = recipients
    .split(',')
    .filter(Boolean)
    .map(email => ({ email: email.trim() }));

  if (req.user.credits - recipientsArray.length < 0) {
    return res.status(403).send('Not enough credits');
  }

  // Prevent request from progressing because client side has review phase
  if (!req.body.validated) {
    return res.send({ validated: false });
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

// Webhook data by Sendgrid to update recipient response
router.post('/webhooks', (req, res) => {
  // Extract surveyId and choice from URL sent by SendGrid
  const path = new Path('/api/surveys/:surveyId/:choice');
  const events = req.body
    .map(({ url, email }) => {
      const pathName = new URL(url).pathname;
      const match = path.test(pathName);

      if (!match) {
        return undefined;
      }

      return { email, surveyId: match.surveyId, choice: match.choice };
    })
    .filter(Boolean); // Filter non-matching events in case of adding more events in the future

  // Update matching Recipient in matching Survey
  events.forEach(({ surveyId, choice, email }) => {
    Survey.updateOne(
      {
        _id: surveyId,
        recipients: {
          $elemMatch: { email, responded: false },
        },
      },
      {
        $inc: { [choice]: 1 },
        $set: { 'recipients.$.responded': true },
        lastResponded: new Date(),
      }
    ).exec();
  });

  res.send(':)');
});

// Endpoint used in email template
router.get('/:surveyId/:choice', (req, res) => {
  res.send('Thanks for voting!');
});

module.exports = router;
