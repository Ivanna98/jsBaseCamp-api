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
  genre: {
    type: String,
  },
  priority: {
    type: Number,
    default: 1,
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
  rate: {
    type: Number,
    default: 8,
  },
  userRating: [
    {
      review: String,
      rate: Number,
      name: {
        type: String,
        default: 'Anonym',
      },
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Show', ShowSchema);
