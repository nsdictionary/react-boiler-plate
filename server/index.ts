import * as express from "express";
import * as Mongoose from "mongoose";
import * as BodyParser from "body-parser";
import * as CookieParser from "cookie-parser";
import config from "./config/key";
import User from "./models/User";
import auth from "./middleware/auth";

const app = express();
const port = 5000;

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(CookieParser());

Mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/hello", (req, res) => {
  res.send("Hello!!~~~");
});

app.post("/api/users/register", async (req, res) => {
  const user = new User(req.body);
  await user.save((err, userInfo) => {
    if (err) {
      return res.json({ ok: false, err });
    }
    return res.status(200).json({ ok: true });
  });
});

app.post("/api/users/login", (req, res) => {
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

app.get("/api/users/auth", auth, (req: any, res) => {
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

app.get("/api/users/logout", auth, (req: any, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
