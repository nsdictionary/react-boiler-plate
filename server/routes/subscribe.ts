import { Router } from "express";
const router = Router();
import auth from "../middleware/auth";
import Subscriber from "../models/Subscriber";

router.post("/subscribeNumber", (req, res) => {
  Subscriber.find({ "userTo": req.body.userTo })
    .exec((err, subscribe) => {
      if(err) {
        return res.status(400).send(err)
      }
      res.status(200).json({ ok: true, subscribeNumber: subscribe.length  })
    })

});

router.post("/subscribed", (req, res) => {
  Subscriber.find({ "userTo": req.body.userTo , "userFrom": req.body.userFrom })
    .exec((err, subscribe) => {
      if(err) {
        return res.status(400).send(err)
      }

      let result = false;
      if(subscribe.length !== 0) {
        result = true
      }

      res.status(200).json({ ok: true, subscribed: result  })
    })

});

router.post("/subscribe", (req, res) => {
  const subscribe = new Subscriber(req.body);

  subscribe.save((err, doc) => {
    if(err) {
      return res.json({ ok: false, err })
    }
    return res.status(200).json({ ok: true })
  })
});

router.post("/unSubscribe", (req, res) => {
  // console.log(req.body)

  Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
    .exec((err, doc)=>{
      if(err) {
        return res.status(400).json({ ok: false, err});
      }
      res.status(200).json({ ok: true, doc })
    })
});

module.exports = router;
