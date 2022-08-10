const express = require("express");
const { create, getAll } = require("../controllers/boardControllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/", verifyToken, create);
router.get("/", verifyToken, getAll);
module.exports = router;
