/*---------------------- database required ---------------------*/

const db = require("../db/models");
const sequelize = db.sequelize;

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
      res.locals.body = req.body;
      res.locals.uniqueEmail = "Ya existe un usuario registrado con este email";
      return res.render("register", { errors: {} });
    }
    if (!errors.isEmpty()) {
      res.locals.errors = errors.mapped();
      res.locals.body = req.body;
      return res.render("register");
    }

    const passwordHashed = bcrypt.hashSync(req.body.password, 10);
    const userEmail = req.body.email;

    await db.User.create({ email: userEmail, password: passwordHashed });

    res.redirect("/login");
  },
  loginForm: (req, res) => {
    res.render("login", { errors: {}, body: {}, loginWrong: false });
  },
  login: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.locals.errors = errors.mapped();
      res.locals.body = req.body;
      return res.render("login", { loginWrong: false });
    }

    const user = await db.User.findOne({
      where: { email: req.body.email },
      attributes: [
        "id",
        "password",
        "email",
        [
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("created_at"),
            "%d-%m-%Y %T"
          ),
          "dates",
        ],
      ],
    });

    const passwordIsTrue = bcrypt.compareSync(req.body.password, user.password);

    if (!user || !passwordIsTrue) {
      res.locals.loginWrong = "Credenciales invalidas";
      res.locals.body = req.body;
      res.render("login", { errors: {} });
    }
   
     
    const userShortName = user.email.split("@")[0];
    const { email, dates ,_previousDataValues} = user;
    req.session.user = { email, userShortName, dates:_previousDataValues.dates };

    res.redirect("/profile");
  },
  profile: (req, res) => {
    res.render("profile");
  },
};

module.exports = userController;
