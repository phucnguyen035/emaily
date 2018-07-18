const mongoose = require('mongoose');

const { Schema } = mongoose;

const surveySchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'user' },
  title: { type: String },
  subject: { type: String },
  body: { type: String },
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  recipients: [
    {
      email: { type: String, required: true },
      responded: { type: Boolean, default: false },
    },
  ],
  dateSent: { type: Date, default: Date.now() },
  lastResponded: Date,
});

mongoose.model('survey', surveySchema);
