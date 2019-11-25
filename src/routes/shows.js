const express = require('express');

const router = express.Router();
const ShowCollection = require('../models/show');
const SeasonCollection = require('../models/season');
const EpisodeCollection = require('../models/episode');
const protect = require('../middleware/protectedRoute');


router.post('/', protect, async (req, res) => {
  try {
    const {
      title,
      subtitle,
      startDate,
      posterImage,
      longDescription,
      shortDescription,
      videoFragmentURL,
    } = req.body;
    const show = new ShowCollection({
      title,
      subtitle,
      startDate,
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
    return res.status(400).end();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const oneShow = await ShowCollection.findById(id);
    return res.json(oneShow);
  } catch (e) {
    return res.status(400).end();
  }
});

router.get('/', async (req, res) => {
  try {
    console.log('auth', req.auth);
    const allShow = await ShowCollection.find();
    return res.json(allShow);
  } catch (e) {
    return res.status(400).end();
  }
});


router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    await Promise.all(
      ShowCollection.findByIdAndDelete(id),
      SeasonCollection.deleteMany({ show: id }),
      EpisodeCollection.deleteMany({ show: id }),
    );
    return res.status(200).end();
  } catch (e) {
    return res.status(400).end();
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const {
      title,
      subtitle,
      startDate,
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

module.exports = router;
