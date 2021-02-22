/*---------------------- database required ---------------------*/

const db = require('../db/models')
const sequelize = db.sequelize

/*---------------------- hashing password ---------------------*/

const bcrypt = require('bcryptjs')
/*---------------------- validations ---------------------*/

const { validationResult } = require('express-validator')

const userController = {
	register: (req, res) => {
		res.render('register', { errors: {}, body: {} })
	},

	registering: async (req, res) => {
		const errors = validationResult(req)
		try {
			const emailRepeated = await db.User.findOne({
				where: { email: req.body.email },
			})

			if (emailRepeated) {
				res.locals.body = req.body
				res.locals.uniqueEmail = 'Ya existe un usuario registrado con este email'
				return res.render('register', { errors: {} })
			}
			if (!errors.isEmpty()) {
				res.locals.errors = errors.mapped()
				res.locals.body = req.body
				return res.render('register')
			}

			const passwordHashed = bcrypt.hashSync(req.body.password, 10)
			const userEmail = req.body.email

			await db.User.create({ email: userEmail, password: passwordHashed })

			res.redirect('/login')
		} catch (error) {
			console.log(error)
			res.render('error-page')
		}
	},
	loginForm: (req, res) => {
		res.render('login', { errors: {}, body: {}, loginWrong: false })
	},
	login: async (req, res) => {
		const errors = validationResult(req)
		try {
			if (!errors.isEmpty()) {
				res.locals.errors = errors.mapped()
				res.locals.body = req.body
				return res.render('login', { loginWrong: false })
			}

			const user = await db.User.findOne({
				where: { email: req.body.email },
				attributes: [
					'id',
					'password',
					'email',
					'avatar',
					[sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%d-%m-%Y %T'), 'dates'],
				],
			})

			const passwordIsTrue = bcrypt.compareSync(req.body.password, user.password)

			if (!user || !passwordIsTrue) {
				res.locals.loginWrong = 'Credenciales invalidas'
				res.locals.body = req.body
			return	res.render('login', { errors: {} })
			}

			const userShortName = user.email.split('@')[0]
			const { email, _previousDataValues, avatar, id } = user
			req.session.user = {
				email,
				userShortName,
				dates: _previousDataValues.dates,
				avatar,
				id,
			}

			res.redirect('/profile')
		} catch (error) {
			console.log(error)
			res.render('error-page')
		}
	},
	profile: (req, res) => {
		res.render('profile')
	},
	avatarUpdate: async (req, res) => {
		const avatar = req.files.length == 0 ? false : req.files[0].filename

		try {
			if (avatar) {
				await db.User.update({ avatar }, { where: { id: req.session.user.id } })
				req.session.user.avatar = avatar
				res.redirect('/profile')
			} else {
				res.locals.notImage = 'Ingresa una foto de tu avatar!'

				res.render('profile')
			}
		} catch (error) {
			console.log(error)
			res.render('error-page')
		}
	},
  logout:(req,res)=>{

    req.session.destroy((err) => {
			res.redirect('/')
		})
  
  }
}

module.exports = userController
