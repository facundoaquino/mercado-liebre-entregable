const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


/*---------------------- database required ---------------------*/

const db = require('../db/models')


const controller = {
	index: async (req, res) => {

		const products = await db.Product.findAll({ include: { association: 'brand' } })

	  products.forEach(product=>product.price=toThousand(product.price))
		 
		res.locals.products = products

		res.render('index');
	},
	search: (req, res) => {
		res.render('results')
	},
};

module.exports = controller;
