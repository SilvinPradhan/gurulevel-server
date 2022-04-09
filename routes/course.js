import express from "express";
import formidable from "express-formidable";
// import { requireSignin } from "../middlewares";
import {
  uploadImage,
  removeImage,
  create,
  read,
  uploadVideo,
  removeVideo,
  addLesson,
  update
} from "../controllers/course";
import { isInstructor, requireSignin } from "../middlewares";
const router = express.Router();

router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);

router.post("/course", requireSignin, isInstructor, create);
router.get("/course/:slug", read);
router.post(
  "/course/video-upload/:instructorId",
  requireSignin,
  formidable(),
  uploadVideo
);
router.post("/course/video-remove/:instructorId", requireSignin, removeVideo);
router.post("/course/lesson/:slug/:instructorId", requireSignin, addLesson);
//update course
router.put("/course/:slug", requireSignin, update);

router;

module.exports = router;
