const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema({
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
  },
  seasonName: {
    type: String,
    require: true,
  },
  seasonNumber: {
    type: Number,
    require: true,
  },
  longDescription: {
    type: String,
    require: true,
  },
  shortDescription: {
    type: String,
    require: true,
  },
  posterUrl: {
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
