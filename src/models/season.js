const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema({
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
  },
  seasonName: {
    type: String,
    required: true,
  },
  seasonNumber: {
    type: Number,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  posterURL: {
    type: String,
  },
  videoFragmentURL: String,
  userRating: [
    {
      review: String,
      rate: Number,
    },
  ],

}, {
  timestamps: true,
});

module.exports = mongoose.model('Season', SeasonSchema);
