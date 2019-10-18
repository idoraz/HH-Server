import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { any } from "async";

export type House = mongoose.Document & {
    isPP: boolean,
    auctionNumber: string,
    docketNumber: string,
    attorneyName: string,
    plaintiffName: string,
    defendantName: string,
    saleType: string,
    saleDate: Date,
    saleStatus: string,
    ppDate: Date,
    costTax: number,
    cost: number,
    reasonForPP: string,
    checks: {
        svs: boolean,
        "3129": boolean,
        ok: boolean
    },
    municipality: string,
    address: string,
    isDuplicate: boolean,
    isFC: boolean,
    isBank: boolean,
    lawFirmMatches: string,
    judgment: string,
    firmName: string,
    contactEmail: string,

  comparePassword: comparePasswordFunction,
  gravatar: (size: number) => string
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

export type AuthToken = {
  accessToken: string,
  kind: string
};

const houseSchema = new mongoose.Schema({
    isPP: Boolean,
    auctionNumber: String,
    docketNumber: String,
    attorneyName: String,
    plaintiffName: String,
    defendantName: String,
    saleType: String,
    saleDate: Date,
    saleStatus: String,
    ppDate: Date,
    costTax: Number,
    cost: Number,
    reasonForPP: String,
    checks: {
        svs: Boolean,
        "3129": Boolean,
        ok: Boolean
    },
    municipality: String,
    address: String,
    isDuplicate: Boolean,
    isFC: Boolean,
    isBank: Boolean,
    lawFirmMatches: String,
    judgment: String,
    firmName: String,
    contactEmail: String,

}, { timestamps: true });

/**
 * Password hash middleware.
 */
houseSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};

houseSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
houseSchema.methods.gravatar = function (size: number) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const House = mongoose.model("House", houseSchema);
export default House;
