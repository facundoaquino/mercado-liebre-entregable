const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

const db = require('../db/models')

const controller = {
	// Root - Show all products
	index: async (req, res) => {
		const products = await db.Product.findAll({ include: { association: 'brand' } })

		console.log(products)
		res.locals.products = products

		res.render('products')
	},

	// Detail - Detail from one product
	show: async (req, res) => {
		const id = req.params.productId

		const product = await db.Product.findByPk(id)

		product.price = toThousand(product.price)
		res.locals.product = product

		res.render('detail')
	},

	// Create - Form to create
	create: async (req, res) => {

		const categories = await db.Categories.findAll()
		const brands = await db.Brands.findAll()
		res.locals.brands=brands
		res.locals.categories=categories
		res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: async (req, res) => {
		const id = req.params.productId

		const product = await db.Product.findByPk(id)

		product.price = toThousand(product.price)
		res.locals.product = product

		res.render('product-edit-form')
	},
	// Update - Method to update
	update: async (req, res) => {
		const id = req.params.productId
		const photoPath= `/images/products/${req.files[0].originalname}`
		await db.Product.update({photo:photoPath  },{where:{id:id}})

		res.redirect('/')
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		// Do the magic
	},
}

module.exports = controller
