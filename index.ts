import * as express from "express";
import * as Mongoose from "mongoose";
import * as BodyParser from "body-parser";
import config from "./config/key";
import User from "./models/User";

const app = express();
const port = 5000;

// application/x-www-form-urlencoded
app.use(BodyParser.urlencoded({ extended: true }));
// application/json
app.use(BodyParser.json());

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
