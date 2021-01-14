import * as dotenv from "dotenv";

const nodeEnv =
  process.env.NODE_ENV && process.env.NODE_ENV.trim().toLowerCase() == "prod"
    ? "prod"
    : "dev";
dotenv.config({ path: `./config/.env.${nodeEnv}` });

export default {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};
