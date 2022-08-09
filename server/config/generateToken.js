const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  // console.log("generate token", process.env.ACTIVE_TOKEN_SECRET);
  return jwt.sign(payload, `${process.env.JWT_SECRET}`, {
    expiresIn: "24h",
  });
};
