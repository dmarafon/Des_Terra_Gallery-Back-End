const Artwork = require("../../../database/models/Artwork");
const User = require("../../../database/models/User");
const mockArtworks = require("../../../utils/mocks/mockArtworks");
const {
  getPaginatedArtworks,
  deleteArtwork,
} = require("../artworkControllers");

jest.mock("../../../database/models/Artwork", () => ({
  find: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
}));

Artwork.skip.mockImplementation(() => {
  throw new Error();
});

const next = jest.fn();

describe("Given the getPaginatedArtworks controller", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  describe("When invoked and an error ocurrs", () => {
    test("Then next function will be called", async () => {
      const req = {
        query: jest.fn().mockReturnThis(),
      };
      await getPaginatedArtworks(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a deleteArtwork controller", () => {
  const req = {
    body: { userId: 3 },
    params: {
      artworkId: 3,
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When invoked with a given artwork id that is not corresponding to an existing art in the database in the body of the request", () => {
    Artwork.findByIdAndDelete = jest.fn().mockResolvedValue(mockArtworks[0]);
    User.findByIdAndUpdate = jest.fn().mockResolvedValue(false);

    test("Then it should call the next function", async () => {
      await deleteArtwork(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
