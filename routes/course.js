import expres from "express";
// import { requireSignin } from "../middlewares";
import { uploadImage, removeImage } from "../controllers/course";
const router = expres.Router();

router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);

module.exports = router;
