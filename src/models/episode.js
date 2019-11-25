const mongoose = require('mongoose');

const EpisodeSchema = new mongoose.Schema({
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Season',
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
  },
  episodeName: {
    type: String,
    required: true,
  },
  episodeNumber: {
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

module.exports = mongoose.model('Episode', EpisodeSchema);
