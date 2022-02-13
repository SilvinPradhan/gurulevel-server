import expres from "express";

const router = expres.Router();

const { register } = require("../controllers/auth");

router.post("/register", register);

module.exports = router;
