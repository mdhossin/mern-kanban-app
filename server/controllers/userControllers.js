const User = require("../models/userModels");
const CustomErrorHandler = require("../utils/CustomErrorHandler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/generateToken");

exports.register = async (req, res, next) => {
  try {
    const exist = await User.exists({
      username: req.body.username,
    });
    if (exist) {
      return next(
        CustomErrorHandler.alreadyExist("This username already taken.")
      );
    }
  } catch (error) {
    return next(error);
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return next(
        CustomErrorHandler.badRequest("Username or password can not be empty.")
      );
    }

    if (password?.length < 6) {
      return next(
        CustomErrorHandler.badRequest("Password must be at least 6 charactors.")
      );
    }

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // prepare the model to store user data on database

    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    const token = generateToken({ id: newUser._id });

    res.status(201).json({ newUser, token });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username }).select("password username");
    if (!user) {
      return next(
        CustomErrorHandler.badRequest("Invalid username or password")
      );
    }

    // if user exists
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return next(
        CustomErrorHandler.badRequest("Username or passowrd is wrong!")
      );
    }

    user.password = undefined;

    const token = generateToken({
      id: user._id,
    });

    res.status(200).json({ user, token });
  } catch (error) {
    return next(error);
  }
};
