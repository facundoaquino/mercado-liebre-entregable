

/*---------------------- database required ---------------------*/

const db = require('../db/models')


const userController = {
	register:  (req, res) => {


		res.render('register');
	}
};

module.exports = userController;
