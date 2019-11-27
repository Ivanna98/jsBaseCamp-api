const express = require('express');

const router = express.Router();
const SeasonCollection = require('../models/season');
const EpisodeCollection = require('../models/episode');
const protect = require('../middleware/protectedRoute');
const postRate = require('./rating');


router.post('/', protect, async (req, res) => {
  try {
    const {
      show,
      seasonName,
      seasonNumber,
      longDescription,
      shortDescription,
      posterURL,
      videoFragmentURL,
    } = req.body;
    if (await SeasonCollection.findOne({ seasonNumber })) {
      return res.status(403).end();
    }
    const season = new SeasonCollection({
      show,
      seasonName,
      seasonNumber,
      longDescription,
      shortDescription,
      posterURL,
      videoFragmentURL,
    });
    const savedRecord = await season.save();
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
    const oneSeason = await SeasonCollection.findById(id);
    return res.json(oneSeason);
  } catch (e) {
    return res.status(400).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const allSeason = await SeasonCollection.find();
    return res.json(allSeason);
  } catch (e) {
    return res.status(400).end();
  }
});


router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    await Promise.all([
      SeasonCollection.findByIdAndDelete(id),
      EpisodeCollection.deleteMany({ season: id }),
    ]);
    return res.status(200).end();
  } catch (e) {
    return res.status(400).end();
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const {
      show,
      seasonName,
      seasonNumber,
      longDescription,
      shortDescription,
      posterURL,
      videoFragmentURL,
    } = req.body;
    const { id } = req.params;
    const updateSeason = await SeasonCollection.findByIdAndUpdate(id, {
      show,
      seasonName,
      seasonNumber,
      longDescription,
      shortDescription,
      posterURL,
      videoFragmentURL,
    }, {
      new: true,
    });
    return res.json(updateSeason);
  } catch (e) {
    return res.status(400).end();
  }
});

router.post('/:id/rating', postRate(SeasonCollection));

module.exports = router;
