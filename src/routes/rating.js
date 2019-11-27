const postRate = (collection) => async (req, res) => {
  try {
    const { id } = req.params;
    const {
      review,
      rate,
      name,
    } = req.body;
    const newEntity = await collection.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          userRating: {
            review,
            rate,
            name,
          },
        },
      },
      { new: true },
    );
    console.log(newEntity);
    return res.json(newEntity.userRating);
  } catch (e) {
    return res.status(400).end();
  }
};

module.exports = postRate;
