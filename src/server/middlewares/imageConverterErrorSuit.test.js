const fs = require("fs");
const path = require("path");
const imageConverter = require("./imageConverter");

jest.mock("firebase/storage", () => ({
  getStorage: () => "test",
  ref: () => {},
  getDownloadURL: async () => "myurl.url",
  uploadBytes: async () => {},
}));

const next = jest.fn();

describe("Given an imageConverter middleware function", () => {
  describe("When it's invoked passing file and the rename file system function fails", () => {
    test("Then it should call the next function 3 times", async () => {
      const expectedNextCalls = 2;
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
      };

      jest
        .spyOn(fs, "rename")
        .mockImplementation((oldpath, newpath, callback) => {
          callback("error");
        });

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await imageConverter(req, res, next);

      expect(next).toHaveBeenCalledTimes(expectedNextCalls);
    });
  });
});
