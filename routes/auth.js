import expres from "express";
import { requireSignin } from "../middlewares";

const router = expres.Router();

const { register, login, logout, currentUser } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);

module.exports = router;
