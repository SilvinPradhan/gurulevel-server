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
  update,
  removeLesson,
  updateLesson,
  publishCourse,
  unpublishCourse,
  courses,
  checkEnrollment,
  freeEnrollment,
} from "../controllers/course";
import { isInstructor, requireSignin } from "../middlewares";

const router = express.Router();
router.get("/courses", courses);

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

// publish and unpublish API
router.put("/course/publish/:courseId", requireSignin, publishCourse);
router.put("/course/unpublish/:courseId", requireSignin, unpublishCourse);

// add and update lesson API
router.post("/course/lesson/:slug/:instructorId", requireSignin, addLesson);
router.put("/course/lesson/:slug/:lessonId", requireSignin, updateLesson);

//update course API
router.put("/course/:slug", requireSignin, update);
// delete lesson API
router.put("/course/:slug/:lessonId", requireSignin, removeLesson);

// check if the user is enrolled
router.get("/check-enrollment/:courseId", requireSignin, checkEnrollment);

{
  /** Enrollment */
}
// Free
router.post("/free-enrollment/:courseId", requireSignin, freeEnrollment);

module.exports = router;
