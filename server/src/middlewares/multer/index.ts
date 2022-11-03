import multer from "multer";
import path from "path";
import crypto from "crypto";
//import { v4 as createRandomString } from "uuid";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "..", "images", "goods"),
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

export const upload = multer({storage})