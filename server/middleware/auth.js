const CustomErrorHandler = require("../utils/CustomErrorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return next(CustomErrorHandler.unAuthorized());
    }

    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

    if (!decoded) {
      return next(CustomErrorHandler.unAuthorized);
    }
    const user = await User.findOne({ _id: decoded.id }).select("-password");

    if (!user) {
      return next(CustomErrorHandler.badRequest("User does not exist."));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = auth;
