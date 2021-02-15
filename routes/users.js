// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const userController = require("../controllers/usersController");

// ************ validations ************

const validate = require("../helpers/validationInput");

router.get("/register", userController.register);
router.post("/register",validate('email','password'), userController.registering);

module.exports = router;
