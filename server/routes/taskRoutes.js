const express = require("express");

const router = express.Router({ mergeParams: true });
const taskControllers = require("../controllers/taskControllers");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, taskControllers.create);
router.put("/update-position", verifyToken, taskControllers.updatePosition);
router.delete("/:taskId", verifyToken, taskControllers.delete);
router.put("/:taskId", verifyToken, taskControllers.update);
module.exports = router;
