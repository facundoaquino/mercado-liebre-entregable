// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const userController = require("../controllers/usersController");

// ************ validations ************

const validate = require("../helpers/validationInput");

router.get("/register", userController.register);
router.post("/register",validate('email','password'), userController.registering);
router.get("/login", userController.loginForm);
router.post("/login",validate('email','password'), userController.login);
router.get('/profile',userController.profile)

module.exports = router;
