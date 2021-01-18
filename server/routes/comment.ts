import {Router} from "express";
import auth from "../middleware/auth";
import Comment from "../models/Comment"
import Like from "../models/Like";

const router = Router();

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body)

  comment.save((err, comment) => {
    if (err) {
      return res.json({ ok: false, err })
    }

    Comment.find({ '_id': comment._id })
      .populate('writer')
      .exec((err, result) => {
        if (err) {
          return res.json({ ok: false, err })
        }
        return res.status(200).json({ ok: true, result })
      })
  })
})

router.post("/getComments", (req, res) => {
  Comment.find({ "videoId": req.body.videoId })
    .populate('writer')
    .exec((err, comments) => {
      if (err) {
        return res.status(400).send(err)
      }
      res.status(200).json({ ok: true, comments })
    })
});

router.post("/removeComment", (req, res) => {
  Comment.findOneAndDelete({'_id': req.body.commentId})
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ ok: false, err })
      }
      res.status(200).json({ ok: true })
    })
})

module.exports = router;
