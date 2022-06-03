const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const connectDB = require("../../database");
const Artwork = require("../../database/models/Artwork");
const app = require("../../server");
const mockArtworks = require("../mocks/mockArtworks");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await Artwork.create(mockArtworks[0]);
  await Artwork.create(mockArtworks[1]);
});

afterEach(async () => {
  await Artwork.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a GET '/all' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should specify json as the content type in the http header", async () => {
      const response = await request(app).get("/artworks/all").expect(200);

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Then it should contain in the title of the first returned art the title 'sleep and in the second 'awake'", async () => {
      const expectedFirstResponse = "sleep";
      const expectedSecondResponse = "awake";

      const {
        body: { artworks },
      } = await request(app).get("/artworks/all").expect(200);

      expect(artworks[0].title).toBe(expectedFirstResponse);
      expect(artworks[1].title).toBe(expectedSecondResponse);
    });
  });
});
