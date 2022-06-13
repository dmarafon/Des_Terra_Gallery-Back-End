const { createArtwork } = require("./artworkControllers");
const Artwork = require("../../database/models/Artwork");

const next = jest.fn();

describe("Given the createArtwork controller", () => {
  describe("When invoked passing in the request the body, userId and images and an error occurs", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const req = {
      userId: "1234",
      body: { artwork: { title: "test" } },
      image: "uploads/images/123445",
      firebaseUrl: "https://firebase.com",
    };

    test("Then the next function will be called ", async () => {
      Artwork.createArtwork = jest.fn().mockResolvedValue(false);

      await createArtwork(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
