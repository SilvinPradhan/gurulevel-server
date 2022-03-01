import expres from "express";
import { requireSignin } from "../middlewares";

const router = expres.Router();

const { makeInstructor } = require("../controllers/instructor");

router.post("/make-instructor", requireSignin, makeInstructor);

module.exports = router;
