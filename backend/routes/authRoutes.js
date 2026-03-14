const {
  login,
  register,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");

const express = require("express");
const router = express.Router();

router.post("/register", login);
router.post("/login", login);

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
