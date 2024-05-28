const multer = require("multer");
const path = require("path");
// storage for images using multer
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const multerMiddleware = multer({
  storage: storage,
}).single("team");

module.exports = { multerMiddleware };
