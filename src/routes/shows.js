const express = require('express');

const router = express.Router();
const ShowCollection = require('../models/show');

router.post('/', async (req, res) => {
  try {
    const {
      title,
      subtitle,
      startDate,
      posterImage,
      longDescription,
      shortDescription,
      videoFragmentURL,
      userRating,
    } = req.body;
    const show = new ShowCollection({
      title,
      subtitle,
      startDate,
      posterImage,
      longDescription,
      shortDescription,
      videoFragmentURL,
      userRating,
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
    const allShow = await ShowCollection.find();
    return res.json(allShow);
  } catch (e) {
    return res.status(400).end();
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ShowCollection.findByIdAndDelete(id);
    return res.status(200).end();
  } catch (e) {
    return res.status(400).end();
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {
      title,
      subtitle,
      startDate,
      posterImage,
      longDescription,
      shortDescription,
      videoFragmentURL,
      userRating,
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
      userRating,
    }, {
      new: true,
    });
    return res.json(updateShow);
  } catch (e) {
    return res.status(400).end();
  }
});

module.exports = router;
