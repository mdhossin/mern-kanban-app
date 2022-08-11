const express = require("express");
const {
  create,
  getAll,
  updatePosition,
  getOne,
  update,
} = require("../controllers/boardControllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/", verifyToken, create);
router.get("/", verifyToken, getAll);
router.put("/", verifyToken, updatePosition);
router.get("/:boardId", verifyToken, getOne);
router.put("/:boardId", verifyToken, update);

module.exports = router;
