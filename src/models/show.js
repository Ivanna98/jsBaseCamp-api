const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  subtitle: String,
  startDate: {
    type: Date,
    require: true,
  },
  posterImage: {
    type: String,
  },
  longDescription: {
    type: String,
    require: true,
  },
  shortDescription: {
    type: String,
    require: true,
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
