/*---------------------- database required ---------------------*/

const db = require("../db/models");

/*---------------------- hashing password ---------------------*/

const bcrypt = require("bcryptjs");
/*---------------------- validations ---------------------*/

const { validationResult } = require("express-validator");

const userController = {
  register: (req, res) => {
    res.render("register", { errors: {}, body: {} });
  },

  registering: async (req, res) => {
    const errors = validationResult(req);

    const emailRepeated = await db.User.findOne({
      where: { email: req.body.email },
    });

    if (emailRepeated) {
      console.log(req.body);
      res.locals.body = req.body;
      res.locals.uniqueEmail = "Ya existe un usuario registrado con este email";
      return res.render("register",{errors:{}});
    }
    if (!errors.isEmpty()) {
      res.locals.errors = errors.mapped();
      res.locals.body = req.body;
      return res.render("register");
    }

    const passwordHashed = bcrypt.hashSync(req.body.password, 10);
    const userEmail = req.body.email;

    await db.User.create({ email: userEmail, password: passwordHashed });

	res.redirect('/login')
  },
  loginForm:(req,res)=>{

	res.render('login', { errors: {}, body: {} })
  },
  login:(req,res)=>{
	console.log(req.body);
	res.send('sigin in')
  }
};

module.exports = userController;
