const mongoose = require("mongoose");
const User = require("../../database/models/User");
const customError = require("../../utils/customError");
const Artwork = require("../../database/models/Artwork");

const getPaginatedArtworks = async (req, res, next) => {
  const {
    page = 1,
    limit = 12,
    filterStyle,
    sortOrderPurchase,
    sortOrderRent,
  } = req.query;
  try {
    let artworks;

    const response = async (queriedStyle) => {
      if (queriedStyle) {
        const count = await Artwork.countDocuments({ style: queriedStyle });
        res.status(200).json({
          artworks,
          currentPage: Math.ceil((page - 1) / limit + 1),
          totalPage: Math.ceil(count / limit),
        });
      } else {
        const count = await Artwork.countDocuments();

        res.status(200).json({
          artworks,
          currentPage: Math.ceil((page - 1) / limit + 1),
          totalPage: Math.ceil(count / limit),
        });
      }
    };

    if (filterStyle && sortOrderPurchase) {
      artworks = await Artwork.find({ style: filterStyle })
        .populate({
          path: "author",
          select: "firstname surname",
          model: User,
        })
        .collation({ locale: "es", numericOrdering: true })
        .sort({ purchaseprice: sortOrderPurchase, title: 1, surname: 1 })
        .limit(limit * 1)
        .skip((page - 1) * 1);

      response(filterStyle);
    } else if (filterStyle && sortOrderRent) {
      artworks = await Artwork.find({ style: filterStyle })
        .populate({
          path: "author",
          select: "firstname surname",
          model: User,
        })
        .collation({ locale: "es", numericOrdering: true })
        .sort({ monthlyrateprice: sortOrderRent, title: 1, surname: 1 })
        .limit(limit * 1)
        .skip((page - 1) * 1);

      response(filterStyle);
    } else if (sortOrderRent) {
      artworks = await Artwork.find()
        .populate({
          path: "author",
          select: "firstname surname",
          model: User,
        })
        .collation({ locale: "es", numericOrdering: true })
        .sort({ monthlyrateprice: sortOrderRent, title: 1, surname: 1 })
        .limit(limit * 1)
        .skip((page - 1) * 1);

      response();
    } else if (sortOrderPurchase) {
      artworks = await Artwork.find()
        .populate({
          path: "author",
          select: "firstname surname",
          model: User,
        })
        .collation({ locale: "es", numericOrdering: true })
        .sort({ purchaseprice: sortOrderPurchase, title: 1, surname: 1 })
        .limit(limit * 1)
        .skip((page - 1) * 1);

      response();
    } else {
      artworks = await Artwork.find()
        .populate({
          path: "author",
          select: "firstname surname",
          model: User,
        })
        .collation({ locale: "es", strength: 2, numericOrdering: true })
        .sort({
          title: 1,
          surname: 1,
          monthlyrateprice: 1,
          purchaseprice: 1,
        })
        .limit(limit * 1)
        .skip((page - 1) * 1);

      response();
    }
  } catch {
    const error = customError(
      400,
      "Bad request",
      "Wrong parameters to get Data"
    );
    next(error);
  }
};

const getPaginatedMyArtworks = async (req, res, next) => {
  const { page = 1, limit = 12 } = req.query;
  const { userId } = req;

  try {
    const { artworkauthor } = await User.findById(userId)
      .populate({
        path: "artworkauthor",
        model: Artwork,
      })
      .limit(limit * 1)
      .skip((page - 1) * 1);

    const count = await User.countDocuments();

    res.status(200).json({
      artworkauthor,
      totalPage: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch {
    const error = customError(
      400,
      "Bad request",
      "Wrong parameters to get Data"
    );
    next(error);
  }
};

const getSingleArtwork = async (req, res, next) => {
  const { artworkId } = req.params;

  try {
    const singleArtwork = await Artwork.findById(artworkId).populate({
      path: "author",
      select: "firstname surname",
      model: User,
    });

    res.status(200).json({
      singleArtwork,
    });
  } catch {
    const error = customError(
      400,
      "Bad request",
      "Wrong parameters to get Data"
    );
    next(error);
  }
};

const deleteArtwork = async (req, res, next) => {
  const { userId } = req;
  const { artworkId } = req.params;

  const artwork = await Artwork.findByIdAndDelete(artworkId);
  if (artwork) {
    const updatedCollection = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { artworkauthor: artworkId },
      },
      { new: true }
    );

    if (updatedCollection) {
      res.status(200).json({ deleted_artwork: artwork });
    }
  } else {
    const error = customError(404, "Bad request", "Artwork Not Found");
    next(error);
  }
};

const createArtwork = async (req, res, next) => {
  try {
    const { userId } = req;
    const artwork = req.body;
    const { image, firebaseUrl } = req;

    const newArtwork = {
      ...artwork,
      author: [mongoose.Types.ObjectId(userId)],
      image,
      imagebackup: firebaseUrl,
    };
    const addArtwork = await Artwork.create(newArtwork);

    const updateUser = await User.updateOne(
      { _id: userId },
      // eslint-disable-next-line no-underscore-dangle
      { $push: { artworkauthor: mongoose.Types.ObjectId(addArtwork._id) } }
    );

    if (updateUser) {
      res.status(201).json({ new_artwork: addArtwork });
    }
  } catch {
    const error = customError(404, "Bad request", "Artwork Not Found");
    next(error);
  }
};

const editArtwork = async (req, res, next) => {
  try {
    const { artworkId } = req.params;
    let artwork = req.body;
    const { image, firebaseUrl } = req;

    if (image) {
      artwork = {
        ...artwork,
        image,
        imagebackup: firebaseUrl,
      };
    }

    const updateArtwork = await Artwork.findByIdAndUpdate(artworkId, artwork, {
      new: true,
    });

    res.status(200).json({ updateArtwork });
  } catch {
    const error = customError(
      404,
      "Error, not Found",
      "The Artwork could not be updated, no Id in the database"
    );
    next(error);
  }
};

module.exports = {
  getPaginatedArtworks,
  getPaginatedMyArtworks,
  getSingleArtwork,
  deleteArtwork,
  createArtwork,
  editArtwork,
};
