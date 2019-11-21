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
    require: true,
  },
  episodeNumber: {
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
  ]

}, {
  timestamps: true,
});

module.exports = mongoose.model('Episode', EpisodeSchema);
