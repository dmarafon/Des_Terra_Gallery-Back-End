const Artwork = require("../../../database/models/Artwork");
const { editArtwork } = require("../artworkControllers");

describe("Given the editArtwork controller", () => {
  jest.mock("../../../database/models/Artwork", () => ({
    find: jest.fn().mockReturnThis(),
  }));

  const next = jest.fn();

  describe("When invoked", () => {
    test("Then a response with status 200, and a response with the itens requested should be received", async () => {
      const expectedStatus = 200;

      const expectedResponse = {
        updateArtwork: true,
      };

      const req = {
        file: {
          destination: "uploads/artimages",
          encoding: "7bit",
          fieldname: "artimages",
          filename: "9d70f017dbcc4a56592467ccca5091fb",
          mimetype: "image/jpeg",
          originalname: "crop1.jpg",
          path: "uploads/artimages/9d70f017dbcc4a56592467ccca5091fb",
          size: 851349,
        },
        body: {
          filename: "test123",
          originalname: "userImage.jpg",
        },
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
        params: { artworkId: "6295020ad1504446d0c04ce8" },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Artwork.findByIdAndUpdate = jest.fn().mockResolvedValue(true);

      await editArtwork(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
