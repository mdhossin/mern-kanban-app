const Section = require("../models/sectionModel");
const Task = require("../models/taskModel");

exports.create = async (req, res, next) => {
  const { boardId } = req.params;

  try {
    const section = await Section.create({
      board: boardId,
    });

    section._doc.tasks = [];

    res.status(200).json(section);
  } catch (error) {
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  const { sectionId } = req.params;

  try {
    const section = await Section.findByIdAndUpdate(sectionId, {
      $set: req.body,
    });

    section._doc.tasks = [];

    res.status(200).json(section);
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  const { sectionId } = req.params;
  try {
    await Task.deleteMany({ section: sectionId });
    await Section.deleteOne({ _id: sectionId });
    res.status(200).json("deleted");
  } catch (err) {
    return next(error);
  }
};
