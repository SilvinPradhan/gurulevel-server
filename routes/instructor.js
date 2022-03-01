import expres from "express";
import { requireSignin } from "../middlewares";

const router = expres.Router();

const {
  makeInstructor,
  getAccountStatus,
} = require("../controllers/instructor");

router.post("/make-instructor", requireSignin, makeInstructor);
router.post("/get-account-status", requireSignin, getAccountStatus);

module.exports = router;
