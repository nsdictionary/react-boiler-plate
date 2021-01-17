import auth from "../middleware/auth";
import * as multer from "multer";
import { Router } from "express";
import * as ffmpeg from "fluent-ffmpeg";
import path = require("path");
import Video from "../models/Video";
import Subscriber from "../models/Subscriber";
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
  if (ext !== ".mp4") {
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

router.post("/thumbnail", (req, res) => {
  let thumbsFilePath: string;
  let fileDuration: number;

  // get video info (duration)
  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    // console.dir(metadata);
    // console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });

  // generate thumbnail
  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        ok: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.log(err);
      return res.json({ ok: false, err });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
});

router.get("/getVideos", (req, res) => {
  Video.find()
    .populate('writer')
    .exec((err, videos) => {
      if(err) {
        return res.status(400).send(err);
      }
      return res.status(200).json({ ok: true, videos })
    })
});

router.post("/getVideo", (req, res) => {
  Video.findOne({ "_id" : req.body.videoId })
    .populate('writer')
    .exec((err, video) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.status(200).json({ ok: true, video })
    })
});

router.post("/uploadVideo", (req, res) => {
  const video = new Video(req.body);

  video.save((err, video) => {
    if (err) {
      return res.status(400).json({ ok: false, err });
    }
    return res.status(200).json({ ok: true });
  });
});

router.post("/getSubscriptionVideos", (req, res) => {
  //Need to find all of the Users that I am subscribing to From Subscriber Collection
  Subscriber.find({ 'userFrom': req.body.userFrom })
    .exec((err, subscribers)=> {
      if(err) {
        return res.status(400).send(err);
      }

      let subscribedUser = [];

      subscribers.map((subscriber: any, i)=> {
        subscribedUser.push(subscriber.userTo)
      })

      //Need to Fetch all of the Videos that belong to the Users that I found in previous step.
      Video.find({ writer: { $in: subscribedUser }})
        .populate('writer')
        .exec((err, videos) => {
          if(err) {
            return res.status(400).send(err);
          }
          res.status(200).json({ ok: true, videos })
        })
    })
});

module.exports = router;
