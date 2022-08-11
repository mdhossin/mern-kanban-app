const Board = require("../models/boardModel");

exports.create = async (req, res, next) => {
  try {
    const boardsCount = await Board.find().count();

    const board = await Board.create({
      user: req.user._id,
      position: boardsCount > 0 ? boardsCount : 0,
    });
    res.status(201).json(board);
  } catch (error) {
    return next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const boards = await Board.find({
      user: req.user._id,
    }).sort("-position");

    res.status(200).json(boards);
  } catch (error) {
    return next(error);
  }
};

exports.updatePosition = async (req, res) => {
  const { boards } = req.body;
  try {
    for (const key in boards.reverse()) {
      const board = boards[key];
      await Board.findByIdAndUpdate(board._id, { $set: { position: key } });
    }
    res.status(200).json({
      message: "updated",
    });
  } catch (error) {
    return next(error);
  }
};
