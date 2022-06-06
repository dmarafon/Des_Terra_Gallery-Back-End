const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const connectDB = require("../../database");
const Artwork = require("../../database/models/Artwork");
const app = require("../../server");
const mockArtworks = require("../mocks/mockArtworks");
const User = require("../../database/models/User");

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

describe("Given a DELETE/myart/:artid endpoint", () => {
  describe("When it receives a request with a artwork id", () => {
    test("Then it should respond with a status 200 and a deleted record", async () => {
      const artwork = await Artwork.find({ title: "sleep" });
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJqZXN1cyIsImVtYWlsIjoiamVzdXNwZXJlYUBnbWFpbC5jb20iLCJpZCI6IjYyOTUwMjBhZDE1MDQ0NDZkMGMwNGNlOCIsImlhdCI6MTY1NDQ4MTgwOX0.lztbEeyEWS0bTem9gu1RnfQ8yrWpYQa8hXItV-Rx7cQ";

      User.findByIdAndUpdate = jest.fn().mockResolvedValue(true);

      const {
        // eslint-disable-next-line camelcase
        body: { deleted_artwork },
      } = await request(app)
        .delete(`/artworks/${artwork[0].id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      await expect(deleted_artwork).toHaveProperty("title", "sleep");
    });
  });
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
