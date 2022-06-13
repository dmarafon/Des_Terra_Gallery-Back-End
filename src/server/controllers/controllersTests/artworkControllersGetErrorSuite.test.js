const User = require("../../../database/models/User");
const { getPaginatedMyArtworks } = require("../artworkControllers");

jest.mock("../../../database/models/User", () => ({
  findby: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  skip: jest.fn(),
  countDocuments: jest.fn(),
}));

User.skip.mockImplementation(() => {
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
        body: jest.fn().mockReturnThis(),
      };
      await getPaginatedMyArtworks(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
