const express = require('express');

const router = express.Router();
const EpisodeCollection = require('../models/episode');

router.post('/', async (req, res) => {
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
    if (EpisodeCollection.findOne({ episodeNumber })) {
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
    const allEpisode = await EpisodeCollection.find();
    return res.json(allEpisode);
  } catch (e) {
    return res.status(400).end();
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await EpisodeCollection.findByIdAndDelete(id);
    return res.status(200).end();
  } catch (e) {
    return res.status(400).end();
  }
});

router.put('/:id', async (req, res) => {
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
    const { id } = req.params;
    const updateEpisode = await EpisodeCollection.findByIdAndUpdate(id, {
      season,
      show,
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

module.exports = router;
