import * as express from "express";
import User, { IUser } from "../models/User";
import auth from "../middleware/auth";
import { Router } from "express";
const router = Router();

declare module "express" {
  interface IRequestUser extends IUser {
    _id: string;
  }
  interface Request {
    user: IRequestUser;
  }
}

router.post(
  "/register",
  async (req: express.Request, res: express.Response) => {
    const user = new User(req.body);
    await user.save((err, userInfo) => {
      if (err) {
        return res.json({ ok: false, err });
      }
      return res.status(200).json({ ok: true });
    });
  }
);

router.post("/login", (req: express.Request, res: express.Response) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({ ok: false, err: "User not found" });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ ok: false, err: "password not matched" });
      }

      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }

        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ ok: true, userId: user._id });
      });
    });
  });
});

router.get("/auth", auth, (req: express.Request, res: express.Response) => {
  res.status(200).json({
    ok: true,
    userId: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.get("/logout", auth, (req: express.Request, res: express.Response) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" },
    {},
    (err, user) => {
      if (err) {
        return res.json({ ok: false, err });
      }
      return res.status(200).send({ ok: true });
    }
  );
});

module.exports = router;
