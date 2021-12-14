const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

//middleware function to check if the incoming request in authenticated:
const verify = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "You are not authenticated" });
    }
    const accessToken = authHeader.split(" ")[1];
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Token is not valid" });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ error: "You are not authenticated" });
  }
};
module.exports = verify;
