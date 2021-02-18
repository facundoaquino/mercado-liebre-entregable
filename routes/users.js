// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const userController = require("../controllers/usersController");

// ************ validations ************

const validate = require("../helpers/validationInput");
// ************ local middleware ************

const {userLogued,userIsLogin} = require("../middlewares/userLogued");

router.get("/register",userIsLogin, userController.register);
router.post(
  "/register",
  validate("email", "password"),
  userController.registering
);
router.get("/login",userIsLogin, userController.loginForm);
router.post("/login", validate("email", "password"), userController.login);
router.get("/profile", userLogued, userController.profile);

module.exports = router;
