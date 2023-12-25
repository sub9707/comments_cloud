const express = require("express");
const usercontroller = require("../controllers/UserController");
const router = express.Router();
const { upload } = require("../config/s3");
const { auth } = require("../config/JWT_middleware");

const uploadMiddleware = upload("userProfile");

router.get("/", usercontroller.getUserInfo);
router.put(
  "/",
  uploadMiddleware.single("profileImg"),
  usercontroller.updateUser
);
router.delete("/", usercontroller.deleteUser);
router.get("/noteData", usercontroller.getUserNoteData);
router.get("/calanderData", usercontroller.getNoteCalendar);
router.get("/recentNote", usercontroller.getRecentNotes);
router.get("/likedNote", usercontroller.getLikedNotes);
router.get("/likedNoteList", usercontroller.getLikedNotesList);
router.get("/checkLikedPublic", usercontroller.checkLikedListPublic);
router.put("/LikedPublic", auth, usercontroller.changeLikedListPublic);
router.get("/findById", usercontroller.userFindById);
router.post("/register", usercontroller.registerUser);
router.post("/login", usercontroller.loginUser);

module.exports = router;
