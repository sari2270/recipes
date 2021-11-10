// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const User = require("../models/user");

// exports.register = (req, res, next) => {
//   const { firstName, lastName, email, password } = req.body;
//   bcrypt
//     .hash(password, 12)
//     .then((hashedPW) => {
//       const user = new User({
//         firstName,
//         lastName,
//         email,
//         password: hashedPW,
//       });
//       return user.save();
//     })
//     .then((result) => {
//       console.log(result);
//       res.status(201).json({ message: "User created!", userId: result._id });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// exports.login = (req, res, next) => {
//   const { email, password } = req.body;
//   let loadedUser;
//   User.findOne({ email: email })
//     .then((user) => {
//       if (!user) {
//         const error = new Error("wrongggg");
//         error.statusCode = 401;
//         throw error;
//       }
//       loadedUser = user;
//       return bcrypt.compare(password, user.password);
//     })
//     .then((isEqual) => {
//       if (!isEqual) {
//         const error = new Error("wrrrrrrrr");
//         error.statusCode = 401;
//         throw error;
//       }
//       const token = jwt.sign(
//         { email: loadedUser.email, userId: loadedUser._id.toString() },
//         'somesupersecretsecret',
//         { expiresIn: "1h" }
//       );
//       res.status(200).json({ token: token, userId: loadedUser._id.toString()});
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

const User = require("../models/user");
const Token = require("../models/token");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

exports.register = async (req, res) => {
  try {
    console.log(1);
    let user = await User.findOne({ email: req.body.email });
    console.log(2);

    if (user) {

      res.status(400).json({ error: "Email taken" });
      // throw new Error("Email taken")
    } else {
      console.log(3);

      user = await new User(req.body).save();
      console.log(4);
      
      let accessToken = await user.createAccessToken();
      console.log(5);
      let refreshToken = await user.createRefreshToken();
      console.log(6);
       res.status(201).json({ accessToken, refreshToken });
    }
  } catch (error) {
    console.log(12345);
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
       res.status(404).json({ error: "No user found" });
    } else {
      let valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) {
        let accessToken = await user.createAccessToken();
        let refreshToken = await user.createRefreshToken();
         res.status(201).json({ accessToken, refreshToken });
      } else {
         res.status(401).json({ error: "Invalid password" });
      }
    }
  } catch (error) {
    console.error(error);
     res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.generateRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
       res.status(403).json({ error: "Access denied, token missing" });
    } else {
      const tokenDoc = await Token.findOne({ token: refreshToken });
      if (!tokenDoc) {
         res.status(401).json({ error: "Token expired" });
      } else {
        const payload = jwt.verify(tokenDoc.token, REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign({ email: payload }, ACCESS_TOKEN_SECRET, {
          expiresIn: "10m",
        });
         res.status(200).json({ accessToken });
      }
    }
  } catch (error) {
    console.error(error);
     res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await Token.findOneAndDelete({ token: refreshToken });
    res.status(200).json({ success: "User logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
