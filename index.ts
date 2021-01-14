import * as express from "express";
import * as Mongoose from "mongoose";
import * as BodyParser from "body-parser";
import * as CookieParser from "cookie-parser";
import config from "./config/key";
import User from "./models/User";

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

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save((err, userInfo) => {
    if (err) {
      return res.json({ ok: false, err });
    }
    return res.status(200).json({ ok: true });
  });
});

app.post("/login", (req, res) => {
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
