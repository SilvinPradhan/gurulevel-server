import expres from "express";
import { requireSignin } from "../middlewares";

const router = expres.Router();

const {
  register,
  login,
  logout,
  currentUser,
  testAWSEmail,
  forgotPassword,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);

router.post("/forgot-password", forgotPassword);

router.get("/send-email", testAWSEmail);

module.exports = router;
