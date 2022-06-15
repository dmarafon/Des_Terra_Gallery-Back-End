const fs = require("fs");
const path = require("path");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");
const customError = require("../../utils/customError");

const firebaseConfig = {
  apiKey: "AIzaSyDfbWRaiapJ-TpzH_XAbML7Y52p0vEVrjs",
  authDomain: "desterra-181ac.firebaseapp.com",
  projectId: "desterra-181ac",
  storageBucket: "desterra-181ac.appspot.com",
  messagingSenderId: "896513326045",
  appId: "1:896513326045:web:de804a868a61c63d495434",
  measurementId: "G-NC61FEQN2N",
};

const firebaseApp = initializeApp(firebaseConfig);

const imageConverter = async (req, res, next) => {
  const { file, webpImage } = req;

  if (file) {
    try {
      const newArtImageName = `${Date.now()}${file.originalname}`;

      fs.rename(
        path.join("uploads", "artimages", file.filename),
        path.join("uploads", "artimages", newArtImageName),
        async (error) => {
          if (error) {
            next(error);
          }
        }
      );

      const newArtImageNameWebP = `${newArtImageName
        .split(".")
        .slice(0, -1)
        .join(".")}.webp`;

      fs.writeFile(
        path.join("uploads", "artimages", newArtImageNameWebP),
        webpImage,
        async (error) => {
          if (error) {
            next(error);
          }
        }
      );

      const newFileUrl = `uploads\\artimages\\${newArtImageNameWebP}`;

      const imageUrl = path.join(newFileUrl);

      req.image = imageUrl;
      await fs.readFile(
        path.join("uploads", "artimages", newArtImageName),
        async (readError, readFile) => {
          if (readError) {
            next(readError);
          }

          const storage = getStorage(firebaseApp);

          const storageRef = ref(storage, newArtImageName);
          const metadata = {
            contentType: "image/webp",
          };

          const storageRefWebp = ref(storage, newArtImageNameWebP);

          await uploadBytes(storageRefWebp, webpImage, metadata);

          await uploadBytes(storageRef, readFile, metadata);

          const firebaseFileURL = await getDownloadURL(storageRefWebp);

          req.firebaseUrl = firebaseFileURL;

          next();
        }
      );
    } catch {
      const error = customError(401, "Bad request", "Invalid Image");
      next(error);
    }
  } else {
    req.firebaseUrl = "";
    req.image = "";
    next();
  }
};

module.exports = imageConverter;
