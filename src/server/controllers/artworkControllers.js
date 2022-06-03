const Artwork = require("../../database/models/Artwork");

const getPaginatedArtworks = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const artworks = await Artwork.find()
      .limit(limit * 1)
      .skip((page - 1) * 1)
      .exec();

    const count = await Artwork.countDocuments();

    res.json({
      artworks,
      totalPage: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPaginatedArtworks };
