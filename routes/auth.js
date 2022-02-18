import expres from "express";
import { requireSignin } from "../middlewares";

const router = expres.Router();

const {
  register,
  login,
  logout,
  currentUser,
  testAWSEmail,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);

router.get("/send-email", testAWSEmail);

module.exports = router;
