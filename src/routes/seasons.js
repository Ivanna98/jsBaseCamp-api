const express = require('express');

const router = express.Router();
const SeasonCollection = require('../models/season');

router.post('/', async (req, res) => {
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
    if (SeasonCollection.findOne({ seasonNumber })) {
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


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await SeasonCollection.findByIdAndDelete(id);
    return res.status(200).end();
  } catch (e) {
    return res.status(400).end();
  }
});

router.put('/:id', async (req, res) => {
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

module.exports = router;
