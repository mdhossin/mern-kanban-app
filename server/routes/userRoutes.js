const express = require("express");
const { register, login, allUser } = require("../controllers/userControllers");

const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/alluser", verifyToken, allUser);

// when hit this route get the user detials
router.post("/verify-token", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
