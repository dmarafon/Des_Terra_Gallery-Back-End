const path = require("path");
const Artwork = require("../../database/models/Artwork");
const { createArtwork } = require("./artworkControllers");

describe("Given the creatArtwork controller", () => {
  jest.mock("../../database/models/Artwork", () => ({
    find: jest.fn().mockReturnThis(),
  }));

  jest.mock("fs", () => ({
    ...jest.requireActual("fs"),
    rename: jest.fn().mockReturnValue("1234image.jpg"),
  }));

  const next = jest.fn();

  describe("When invoked but the user to be updated with the object created is not found", () => {
    test("Then it should throw a new error and the next function should be called", async () => {
      const req = {
        file: {},
        body: {
          filename: "test123",
          originalname: "userImage.jpg",
        },
        userId: "6295020ad1504446d0c04ce8",
        artwork: {
          description:
            "This work was created during a residence in Chile where I had the pleasure to meet Kamiko. I was very inspired by her art and even more by her perfect stillness while posing to this painting. One thing that I will take from Kamiko is that silence goes to places that sound would never dare to go.",
          height: "100 inches",
          id: "6294aa4bc78dbede9429006e",
          medium: "mixed media in paper",
          monthlyrateprice: "30",
          picture: "https://ibb.co/QC6YrNc",
          purchaseprice: "400",
          style: "mixed media",
          title: "sleep",
          width: "40 inches",
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(path, "join").mockImplementation(() => {
        throw new Error();
      });

      Artwork.create = jest.fn().mockResolvedValue(false);

      await createArtwork(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
