const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

/*---------------------- database required ---------------------*/

const db = require('../db/models')
const { Op } = db.Sequelize

const controller = {
	index: async (req, res) => {
		try {
			const products = await db.Product.findAll({
				include: { association: 'brand' },
				limit: 10,
			})

			products.forEach((product) => (product.price = toThousand(product.price)))

			res.locals.products = products

			res.render('index')
		} catch (error) {
			console.log(error)
			res.render('error-page')
		}
	},
	search: async (req, res) => {
		const startPage = Number(req.query.start) || 0
		try {
			const { count, rows: products } = await db.Product.findAndCountAll({
				where: {
					title: { [Op.like]: `%${req.query.keywords}%` },
				},
				order: [['created_at', 'DESC']],
				offset: startPage,
				limit: 10,
			})
			const totalRound = Math.floor((count + 10) / 10)
			const page = startPage / 10 + 1
			res.locals.referencePage = { totalRound, page }
			if (totalRound == page) {
				res.locals.pagination = { continue: false, count }
			} else {
				res.locals.pagination = { continue: true, start: startPage + 10, count }
			}
			products.forEach((product) => (product.price = toThousand(product.price)))

			if (products.length == 0) {
				res.render('results', { products: false, keywords: req.query.keywords })
			} else {
				res.render('results', {
					products: products,
					keywords: req.query.keywords,
				})
			}
		} catch (error) {
			console.log(error)
			res.render('error-page')
		}
	},
}

module.exports = controller
