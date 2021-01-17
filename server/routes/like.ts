import {Router} from "express";
import auth from "../middleware/auth";
import Like from "../models/Like"
import Dislike from "../models/Dislike"

const router = Router();

router.post("/getLikes", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = {videoId: req.body.videoId}
  } else {
    variable = {commentId: req.body.commentId}
  }

  Like.find(variable)
    .exec((err, likes) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).json({ok: true, likes})
    })
})


router.post("/getDislikes", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = {videoId: req.body.videoId}
  } else {
    variable = {commentId: req.body.commentId}
  }

  Dislike.find(variable)
    .exec((err, dislikes) => {
      if (err) {
        return res.status(400).send(err);
      }
      res.status(200).json({ok: true, dislikes})
    })
})

module.exports = router;
