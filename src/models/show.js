const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: String,
  startDate: {
    type: Date,
    required: true,
  },
  posterImage: {
    type: String,
  },
  longDescription: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
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

module.exports = mongoose.model('Show', ShowSchema);
