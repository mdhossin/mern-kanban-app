const express = require("express");
const {
  create,
  getAll,
  updatePosition,
} = require("../controllers/boardControllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/", verifyToken, create);
router.get("/", verifyToken, getAll);
router.put("/", verifyToken, updatePosition);

module.exports = router;
