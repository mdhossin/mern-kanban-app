const Board = require("../models/boardModel");
const Section = require("../models/sectionModel");
const Task = require("../models/taskModel");
const CustomErrorHandler = require("../utils/CustomErrorHandler");

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

exports.getOne = async (req, res, next) => {
  const { boardId } = req.params;

  try {
    const board = await Board.findOne({
      user: req.user._id,
      _id: boardId,
    });

    if (!board) {
      return next(CustomErrorHandler.notFound("Board not found."));
    }

    const sections = await Section.find({
      board: boardId,
    });
    // populate() function in mongoose is used for populating the data inside the reference
    for (const section of sections) {
      const tasks = await Task.find({
        section: section._id,
      }).populate.sort("-position");

      section._doc.tasks = tasks;
    }

    board._doc.sections = sections;

    res.status(200).json(board);
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  const { boardId } = req.params;

  const { title, description, favourite } = req.body;

  try {
    if (title === "") req.body.title = "Untitled";
    if (description === "") req.body.description = "Add description here";

    const currentBoard = await Board.findById(boardId);

    if (favourite !== undefined && currentBoard.favourite !== favourite) {
      const favourites = await Board.find({
        user: currentBoard.user,
        favourite: true,
        // $ne = not equal
        _id: { $ne: boardId },
      }).sort("favouritePosition");

      if (favourite) {
        req.body.favouritePosition =
          favourites.length > 0 ? favourites.length : 0;
      } else {
        for (const key in favourites) {
          console.log(key, favourites, "favourites");
          const element = favourites[key];

          await Board.findByIdAndUpdate(element._id, {
            $set: {
              favouritePosition: key,
            },
          });
        }
      }
    }

    const board = await Board.findByIdAndUpdate(boardId, {
      $set: req.body,
    });

    res.status(200).json(board);
  } catch (error) {
    return next(error);
  }
};
