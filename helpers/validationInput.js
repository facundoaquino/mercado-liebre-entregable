const { check } = require('express-validator')

const allValidations = {
	email: check('email').isEmail().withMessage('Formato de email invalido'),
	title: check('title').isLength({min:3,max:100}).withMessage('Minimo 3 caracteres maximo 100 !'),
	description: check('description').isLength({ max:1000}).withMessage('Maximo 1000 caracteres !!'),
    password:check('password').isLength({min:6 ,max:9}).withMessage('La contraseña debe tener entre 6 y 9 caracteres'),
    price:check('price').isInt({min:1}).withMessage('El precio tiene que ser mayor que 0')
}

const validate = (...validations) => {
	const chosenValidations = validations

	const resul = chosenValidations.reduce((obj, val) => {
		obj.push(allValidations[val])

		return obj
	}, [])

	return resul.length ? resul : Object.values(allValidations)
}

module.exports = validate
