// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const userController = require("../controllers/usersController");

// ************ validations ************

const validate = require("../helpers/validationInput");
// ************ local middleware ************

const {userLogued,userIsLogin} = require("../middlewares/userLogued");

// ************ multer ************

const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images/users')
	},
	filename: function (req, file, cb) {
		cb(null, req.session.user.userShortName + file.originalname)
	},
})

const upload = multer({ storage: storage })

router.get("/register",userIsLogin, userController.register);
router.post(
  "/register",
  validate("email", "password"),
  userController.registering
);
router.get("/login",userIsLogin, userController.loginForm);
router.post("/login", validate("email", "password"), userController.login);
router.get("/profile", userLogued, userController.profile);
router.patch('/avatar/update',userLogued ,upload.any(),userController.avatarUpdate)
module.exports = router;
