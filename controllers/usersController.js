/*---------------------- database required ---------------------*/

const db = require("../db/models");

/*---------------------- hashing password ---------------------*/

const bcrypt = require("bcryptjs");
/*---------------------- validations ---------------------*/

const { validationResult } = require("express-validator");

const userController = {
  register: (req, res) => {
    res.render("register",{errors:{}});
  },

  registering: async (req, res) => {
	
    const errors = validationResult(req);

	const emailRepeated = await db.User.findOne({where:{email:req.body.email}})
	
    if (!errors.isEmpty() || emailRepeated) {
      res.locals.errors = errors.mapped();
		console.log(res.locals.errors.password);
      return res.render("register");
    }

    const passwordHashed = bcrypt.hashSync(req.body.password, 10);
    const userEmail = req.body.email;

    await db.User.create({ email: userEmail, password: passwordHashed });
  },
};

module.exports = userController;
