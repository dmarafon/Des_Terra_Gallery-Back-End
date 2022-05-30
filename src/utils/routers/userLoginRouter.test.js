const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const connectDB = require("../../database");
const User = require("../../database/models/User");
const app = require("../../server");
const mockUsers = require("../mocks/mockUsers");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await connectDB(mongoServer.getUri());
});

beforeEach(async () => {
  await User.create(mockUsers[0]);
  await User.create(mockUsers[1]);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a POST '/login' endpoint", () => {
  describe("When it receives a request", () => {
    const userRequestReceived = {
      email: "testemail2@test.com",
      password: "test2",
    };

    test("Then it should specify json as the content type in the http header", async () => {
      const response = await request(app)
        .post("/users/login")
        .send(userRequestReceived);

      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Then it should contain a token in the response body", async () => {
      const response = await request(app)
        .post("/users/login")
        .send(userRequestReceived);

      expect(response.body.token).toBeDefined();
    });
  });
});
