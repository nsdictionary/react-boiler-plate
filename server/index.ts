import * as express from "express";
import * as Mongoose from "mongoose";
import * as BodyParser from "body-parser";
import * as CookieParser from "cookie-parser";
import * as cors from "cors";
import config from "./config/key";

const app = express();
const port = process.env.PORT || 5000;

Mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(CookieParser());
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use("/api/users", require("./routes/users"));
app.use("/api/video", require("./routes/video"));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/like', require('./routes/like'));
app.use('/api/comment', require('./routes/comment'));

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
