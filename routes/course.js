import expres from "express";
// import { requireSignin } from "../middlewares";
import { uploadImage } from "../controllers/course";
const router = expres.Router();

router.post("/course/upload-image", uploadImage);

module.exports = router;
