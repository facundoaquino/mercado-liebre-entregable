/*---------------------- database required ---------------------*/

const db = require("../db/models");

/*---------------------- hashing password ---------------------*/

const bcrypt = require('bcryptjs')


const userController = {
  register: (req, res) => {
    res.render("register");
  },

  registering: async (req, res) => {

	const passwordHashed = bcrypt.hashSync(req.body.password,10)
	const userEmail = req.body.email

	await db.User.create({email:userEmail,password:passwordHashed})
  },
};

module.exports = userController;
