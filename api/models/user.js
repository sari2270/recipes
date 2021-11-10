const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Token = require('../models/token')

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods = {
  createAccessToken: async function ()  {
    try {
      console.log("********************", ACCESS_TOKEN_SECRET );
      let { _id, email } = this;
      let accesToken = jwt.sign({ user: { _id, email } }, ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
      });
    console.log("userSchema.createAccessToken done");
      return accesToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },
  createRefreshToken: async () => {
    try {
      let { _id, email } = this;
      let refreshToken = jwt.sign(
        { user: { _id, email } },
        REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      await new Token({ token: refreshToken }).save();
    console.log("userSchema.createRefreshToken done");

      return refreshToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },
};

userSchema.pre("save", async function (next)  {
  try {
    let salt = await bcrypt.genSalt(12);
    console.log("&&&&&&&&&&&&&&&&&&", this.password, salt);
    let hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    console.log("userSchema.pre done");
  } catch (error) {
    console.error(error);
  }
  return next();
});

module.exports = mongoose.model("User", userSchema);
