import express from "express";
// import { requireSignin } from "../middlewares";
import { uploadImage, removeImage, create } from "../controllers/course";
import { isInstructor, requireSignin } from "../middlewares";
const router = express.Router();

router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);

router.post("/course", requireSignin, isInstructor, create);

module.exports = router;
