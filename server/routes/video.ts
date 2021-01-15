import auth from "../middleware/auth";
import * as multer from "multer";
import { Router } from "express";
import path = require("path");
const router = Router();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".mp4" && ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    cb(new Error("only mp4|png|jpg is allowed"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter }).single("file");

router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ ok: false, err });
    }
    return res.json({
      ok: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
