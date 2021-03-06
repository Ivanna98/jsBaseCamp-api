const express = require('express');

const router = express.Router();
const EpisodeCollection = require('../models/episode');
const protect = require('../middleware/protectedRoute');
const postRate = require('./rating');

router.post('/', protect, async (req, res) => {
  try {
    const {
      season,
      show,
      episodeName,
      episodeNumber,
      longDescription,
      shortDescription,
      posterURL,
      videoFragmentURL,
    } = req.body;
    if (await EpisodeCollection.findOne({ episodeNumber, season })) {
      return res.status(403).end();
    }
    const episode = new EpisodeCollection({
      season,
      show,
      episodeName,
      episodeNumber,
      longDescription,
      shortDescription,
      posterURL,
      videoFragmentURL,
    });
    const savedRecord = await episode.save();
    return res.json({
      data: savedRecord,
    });
  } catch (e) {
    return res.status(400).end();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const oneEpisode = await EpisodeCollection.findById(id);
    return res.json(oneEpisode);
  } catch (e) {
    return res.status(400).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const oneEpisode = await EpisodeCollection.find();
    return res.json(oneEpisode);
  } catch (e) {
    return res.status(400).end();
  }
});


router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    await EpisodeCollection.findByIdAndDelete(id);
    return res.status(200).end();
  } catch (e) {
    return res.status(400).end();
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const {
      episodeName,
      episodeNumber,
      longDescription,
      shortDescription,
      posterURL,
      videoFragmentURL,
    } = req.body;
    const { id } = req.params;
    const updateEpisode = await EpisodeCollection.findByIdAndUpdate(id, {
      episodeName,
      episodeNumber,
      longDescription,
      shortDescription,
      posterURL,
      videoFragmentURL,
    }, {
      new: true,
    });
    return res.json(updateEpisode);
  } catch (e) {
    return res.status(400).end();
  }
});

router.post('/:id/rating', postRate(EpisodeCollection));

module.exports = router;
