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

router.post("/upLike", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId , userId: req.body.userId }
  }

  const like = new Like(variable)

  //save the like information data in MongoDB
  like.save((err, likeResult) => {
    if (err) {
      return res.json({ ok: false, err });
    }

    //In case disLike Button is already clicked, we need to decrease the dislike by 1
    Dislike.findOneAndDelete(variable)
      .exec((err, disLikeResult) => {
        if (err) {
          return res.status(400).json({ ok: false, err });
        }
        res.status(200).json({ ok: true })
      })
  })
})

router.post("/unLike", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId , userId: req.body.userId }
  }

  Like.findOneAndDelete(variable)
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ ok: false, err })
      }
      res.status(200).json({ ok: true })
    })

})

router.post("/unDisLike", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId , userId: req.body.userId }
  }

  Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({ ok: false, err })
      }
      res.status(200).json({ ok: true })
    })
})

router.post("/upDisLike", (req, res) => {
  let variable = {}
  if (req.body.videoId) {
    variable = { videoId: req.body.videoId, userId: req.body.userId }
  } else {
    variable = { commentId: req.body.commentId , userId: req.body.userId }
  }

  const disLike = new Dislike(variable)

  //save the like information data in MongoDB
  disLike.save((err, dislikeResult) => {
    if (err) {
      return res.json({ ok: false, err });
    }

    //In case Like Button is already clicked, we need to decrease the like by 1
    Like.findOneAndDelete(variable)
      .exec((err, likeResult) => {
        if (err) {
          return res.status(400).json({ ok: false, err });
        }
        res.status(200).json({ ok: true })
      })
  })
})

module.exports = router;
