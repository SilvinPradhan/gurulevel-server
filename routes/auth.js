import expres from "express";

const router = expres.Router();

const { register, login } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
