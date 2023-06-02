const multer = require("multer");
const { join } = require("path");

const imageValidMimeTypes = ["image/png", "image/jpeg"];

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "..", "public", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const multerUpload = multer({
  storage: multerStorage,
  fileFilter: function (req, file, cb) {
    if (!imageValidMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Only PNG and JPEG images are allowed"));
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = { multerUpload };

// tinymce
// CKEditor
// vev
