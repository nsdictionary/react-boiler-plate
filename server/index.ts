import * as express from "express";
import * as Mongoose from "mongoose";
import * as BodyParser from "body-parser";
import * as CookieParser from "cookie-parser";
import * as cors from "cors";
import UserRouter from "./routes/users";
import config from "./config/key";

const app = express();
const port = process.env.PORT || 5000;

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(CookieParser());
app.use(cors());

Mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api/users", UserRouter);

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
