const multer = require("multer");
const { join } = require("path");

const avatarValidMimetype = ["image/png", "image/jpeg"];

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "..", "public", "images", "avatars"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: function (req, file, cb) {
    if (!avatarValidMimetype.includes(file.mimetype)) {
      return cb(new Error("Only PNG and JPEG images are allowed"));
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

module.exports = { uploadAvatar };
