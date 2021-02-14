const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

/*---------------------- database required ---------------------*/

const db = require('../db/models')

/*---------------------- validations ---------------------*/

const { validationResult } = require('express-validator')

const controller = {
	// Root - Show all products
	index: async (req, res) => {
		const products = await db.Product.findAll({ include: { association: 'brand' } })

		products.forEach((product) => (product.price = toThousand(product.price)))

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
		res.locals.brands = brands
		res.locals.categories = categories
		res.render('product-create-form',{errors:{} ,body:{}})
	},

	// Create -  Method to store
	store: async (req, res) => {
		const errors = validationResult(req)
		console.log(req.files[0]);
		if (!errors.isEmpty() || (! req.files[0])) {
			res.locals.errors = errors.mapped()
			res.locals.body = req.body
			res.locals.brands = await db.Brands.findAll()
			res.locals.categories = await db.Categories.findAll()
			if(!req.files[0]){
				res.locals.errors.image = 'Ingresa una foto de tu producto!'
			}
			return res.render('product-create-form')
		}

		const { title, description, brand, category, price } = req.body

		const producModel = {
			title,
			brand_id: brand,
			category_id: category,
			price,
			description,
			photo: `/images/products/${req.files[0].originalname}`,
			stock: 100,
		}

		await db.Product.create(producModel)
		res.redirect('/')
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
		const photoPath = `/images/products/${req.files[0].originalname}`
		await db.Product.update({ photo: photoPath }, { where: { id: id } })

		res.redirect('/')
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		// Do the magic
	},
}

module.exports = controller
