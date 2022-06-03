const Artwork = require("../../database/models/Artwork");
const { getPaginatedArtworks } = require("./artworkControllers");

jest.mock("../../database/models/Artwork", () => ({
  find: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  skip: jest.fn(),
  countDocuments: jest.fn(),
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
