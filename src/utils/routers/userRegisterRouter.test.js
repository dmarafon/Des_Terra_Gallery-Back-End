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

describe("Given a POST '/register' endpoint", () => {
  describe("When it receives a request without the email 'newuser@mytest.com' ", () => {
    test("Then it should not have in the body of the response the email 'newuser@mytest.com' and error 400 with the message 'Bad Request'", async () => {
      const expectedErrorMessage = "Bad Request";

      const testFile = "tesfile";

      const {
        body: { msg },
      } = await request(app)
        .post("/users/register")
        .type("multipart/form-data")
        .field("firstname", "Test")
        .field("surname", "Test")
        .field("email", "")
        .field("password", "1234")
        .field("webpage", "http://www.test1.com")
        .field("address", "carrer de test, 1")
        .field("apartmentdoorstair", "1 - 1")
        .field("city", "testcity1")
        .field("phonenumber", "+11111111111")
        .field("artist", "true")
        .attach("image", Buffer.from(testFile, "utf-8"), {
          filename: "12343425",
          originalname: "testimage.jpg",
        })
        .expect(400);

      expect(msg).toBe(expectedErrorMessage);
    });
  });

  describe("When it receives a request with the email 'newuser@mytest.com' ", () => {
    test("Then it should have in the body of the response the email 'newuser@mytest.com' with the status 201", async () => {
      const testFile = "tesfile";

      const expectedEmailUserAddress = "newuser@mytest.com";

      const {
        body: {
          new_user: { email },
        },
      } = await request(app)
        .post("/users/register")
        .type("multipart/form-data")
        .field("firstname", "Test")
        .field("surname", "Test")
        .field("email", "newuser@mytest.com")
        .field("password", "1234")
        .field("webpage", "http://www.test1.com")
        .field("address", "carrer de test, 1")
        .field("apartmentdoorstair", "1 - 1")
        .field("city", "testcity1")
        .field("phonenumber", "+11111111111")
        .field("artist", "true")
        .attach("image", Buffer.from(testFile, "utf-8"), {
          filename: "12343425",
          originalname: "testimage.jpg",
        })
        .expect(201);

      expect(email).toBe(expectedEmailUserAddress);
    });
  });
});
