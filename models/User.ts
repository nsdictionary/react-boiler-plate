import { Document, model, Model, Schema } from "mongoose";
import { NextFunction } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import config from "../config/key";

export interface IUser {
  email: string;
  password: string;
  name?: string;
  lastname?: string;
  role: number;
  image?: string;
  token?: string;
  tokenExp?: number;
}
interface IUserDocument extends IUser, Document {
  comparePassword(plainPassword: string, cb): void;
  generateToken(cb): void;
}
interface IUserModel extends Model<IUserDocument> {
  findByToken(token: string, cb): void;
}

const userSchema = new Schema<IUserDocument, IUserModel>({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre<IUserDocument>("save", function (next: NextFunction) {
  const user = this;
  if (user.isModified("password")) {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword: string, cb) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), config.jwtSecret);
  user.token = token;
  user.save((err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token: string, cb) {
  const user = this;
  jwt.verify(token, config.jwtSecret, function (err, decoded) {
    user.findOne({ _id: decoded, token: token }, (err, user) => {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  });
};

const User = model<IUserDocument, IUserModel>("User", userSchema);
export default User;
