const express = require('express');

const router = express.Router();
const ShowCollection = require('../models/show');
const SeasonCollection = require('../models/season');
const EpisodeCollection = require('../models/episode');
const protect = require('../middleware/protectedRoute');
const postRate = require('./rating');


router.post('/', protect, async (req, res) => {
  try {
    const {
      title,
      subtitle,
      startDate,
      priority,
      genre,
      posterImage,
      longDescription,
      shortDescription,
      videoFragmentURL,
    } = req.body;
    const show = new ShowCollection({
      title,
      subtitle,
      startDate,
      priority,
      genre,
      posterImage,
      longDescription,
      shortDescription,
      videoFragmentURL,
    });
    const savedRecord = await show.save();
    return res.json({
      data: savedRecord,
    });
  } catch (e) {
    console.log(e.stack);
    return res.status(400).end();
  }
});

router.get('/count', async (req, res) => {
  try {
    const selector = {};
    const { genre } = req.query || {};
    if (genre) {
      selector.genre = genre;
    }
    const showsAmount = await ShowCollection.count(selector);
    return res.json({ showsAmount });
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [oneShow, seasons] = await Promise.all([
      ShowCollection.findById(id).lean(),
      SeasonCollection.find({ show: id }),
    ]);
    return res.json({ ...oneShow, seasons });
  } catch (e) {
    return res.status(400).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const selector = {};
    const {
      genre, priority, skip, limit,
    } = req.query || {};
    if (genre) {
      selector.genre = genre;
    }
    if (priority) {
      selector.priority = { $gte: parseFloat(priority) };
    }
    const shows = await ShowCollection.find(
      selector,
      {
        _id: true,
        title: true,
        posterImage: true,
        rate: true,
        shortDescription: true,
        genre: true,
      },
    ).skip(Number(skip) || 0).limit(Number(limit) || 0);
    return res.json({ shows });
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    await Promise.all([
      ShowCollection.findByIdAndDelete(id),
      SeasonCollection.deleteMany({ show: id }),
      EpisodeCollection.deleteMany({ show: id }),
    ]);
    return res.status(200).end();
  } catch (e) {
    console.log(e.stack);
    return res.status(400).end();
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const {
      title,
      subtitle,
      startDate,
      priority,
      genre,
      posterImage,
      longDescription,
      shortDescription,
      videoFragmentURL,
    } = req.body;
    const { id } = req.params;
    const updateShow = await ShowCollection.findByIdAndUpdate(id, {
      title,
      subtitle,
      startDate,
      priority,
      genre,
      posterImage,
      longDescription,
      shortDescription,
      videoFragmentURL,
    }, {
      new: true,
    });
    return res.json(updateShow);
  } catch (e) {
    return res.status(400).end();
  }
});

router.post('/:id/rating', postRate(ShowCollection));

module.exports = router;
