const fs = require("fs");
const path = require("path");
const imageConverter = require("./imageConverter");

jest.mock("firebase/storage", () => ({
  ref: jest.fn().mockReturnValue("avatarRef"),
  uploadBytes: jest.fn().mockResolvedValue(),
  getStorage: jest.fn(),
  getDownloadURL: jest.fn().mockResolvedValue("url"),
}));

const next = jest.fn();

describe("Given an imageConverter middleware function", () => {
  describe("When it's invoked passing file and the rename file system function fails", () => {
    test("Then it should call the next function 3 times", async () => {
      const expectedNextCalls = 1;
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
          callback();
        });

          jest
        .spyOn(path, "join")
        .mockReturnValue(`${path.join("uploads", "images")}`);

      jest
        .spyOn(fs, "rename")
        .mockImplementation((oldpath, newpath, callback) => {
          callback();
        });

      jest.spyOn(fs, "readFile").mockImplementation((pathToRead, callback) => {
        callback("readFileError");
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
