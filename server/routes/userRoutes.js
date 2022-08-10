const express = require("express");
const { register, login, allUser } = require("../controllers/userControllers");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/alluser", auth, allUser);

module.exports = router;
