import { Schema, model, Model, Document } from "mongoose";
import * as bcrypt from "bcrypt";
import { NextFunction } from "express";

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

export interface IUserModel extends IUser, Document {
  fullName(): string;
}

const userSchema: Schema<IUserModel> = new Schema({
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

userSchema.pre<IUserModel>("save", function (next: NextFunction) {
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
  }
});

const User: Model<IUserModel> = model<IUserModel>("User", userSchema);
export default User;
