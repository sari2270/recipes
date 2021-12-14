const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Token = require("../models/token");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, REFRESH_TOKEN_SECRET);
};

exports.register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ errors: ["Email taken"] });
    } else {
      user = await new User(req.body).save();
      res.status(201).json("user register");
    }
  } catch (error) {
    res.status(500).json({ errors: ["Internal Server Error"] });
  }
};

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ errors: ["No user found"] });
    } else {
      let valid = bcrypt.compare(req.body.password, user.password);
      if (valid) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        await new Token({ token: refreshToken }).save();
        res.status(201).json({
          id: user._id,
          firstName: user.firstName,
          email: user.email,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        res.status(401).json({ errors: ["Invalid password"] });
      }
    }
  } catch (error) {
    res.status(500).json({ errors: ["Internal Server Error"] });
  }
};

exports.logout = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    await Token.findOneAndDelete({ token: refreshToken });
    res.status(200).json({ success: "User logged out" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      return res.status(401).json({ error: "You are not authenticated" });
    }
    const token = await Token.findOne({ token: refreshToken });
    if (!token) {
      return res.status(403).json({ error: "Refresh token is not valid" });
    }
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) {
        res.status(500).json({ error: err.message });
      }
      await Token.findOneAndDelete({ token: refreshToken });
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      await new Token({ token: newRefreshToken }).save();
      res
        .status(200)
        .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  } catch (error) {
    res.status(500).json({ errors: ["Internal Server Error"] });
  }
};
