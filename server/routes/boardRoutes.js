const express = require("express");
const {
  create,
  getAll,
  updatePosition,
  getOne,
  update,
  getFavourites,
  updateFavouritePosition,
  deleteBoard,
} = require("../controllers/boardControllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/favourites", verifyToken, getFavourites);
router.put("/favourites", verifyToken, updateFavouritePosition);
router.get("/", verifyToken, getAll);
router.get("/:boardId", verifyToken, getOne);

router.post("/", verifyToken, create);
router.put("/", verifyToken, updatePosition);
router.put("/:boardId", verifyToken, update);
router.delete("/:boardId", verifyToken, deleteBoard);

module.exports = router;
