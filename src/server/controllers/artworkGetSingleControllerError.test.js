const { getSingleArtwork } = require("./artworkControllers");
const Artwork = require("../../database/models/Artwork");

const next = jest.fn();

describe("Given the getSingleArtwork controller", () => {
  describe("When invoked passing in the query parameters the artwork Id and an error occurs", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const req = { params: { artworkId: "1234" } };

    test("Then the next function will be called ", async () => {
      Artwork.findById = jest.fn().mockResolvedValue(false);

      await getSingleArtwork(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
