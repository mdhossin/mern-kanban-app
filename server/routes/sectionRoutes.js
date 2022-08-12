const express = require("express");

const router = express.Router({ mergeParams: true });
const sectionControllers = require("../controllers/sectionConrollers");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, sectionControllers.create);
router.put("/:sectionId", verifyToken, sectionControllers.update);
router.delete("/:sectionId", verifyToken, sectionControllers.delete);
module.exports = router;
