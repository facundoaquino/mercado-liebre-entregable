const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/*---------------------- database required ---------------------*/

const db = require("../db/models");

/*---------------------- validations ---------------------*/

const { validationResult } = require("express-validator");

const controller = {
  // Root - Show all products
  index: async (req, res) => {
    const startPage = Number(req.query.start) || 0;
    const { count, rows: products } = await db.Product.findAndCountAll({
      include: { association: "brand" },
      offset: startPage,
      limit: 10,
    });
    const totalRound = Math.floor((count + 10) / 10);
    const page = startPage / 10 + 1;
    res.locals.referencePage = { totalRound, page };

    if (products.length < 10) {
      res.locals.pagination = { continue: false, count };
    } else {
      res.locals.pagination = { continue: true, start: startPage + 10, count };
    }
    products.forEach((product) => (product.price = toThousand(product.price)));
    res.locals.products = products;
    res.render("products");
  },

  // Detail - Detail from one product
  show: async (req, res) => {
    const id = req.params.productId;

    const product = await db.Product.findByPk(id);

    product.price = toThousand(product.price);
    res.locals.product = product;

    res.render("detail");
  },

  // Create - Form to create
  create: async (req, res) => {
    const categories = await db.Categories.findAll();
    const brands = await db.Brands.findAll();
    res.locals.brands = brands;
    res.locals.categories = categories;
    res.render("product-create-form", { errors: {}, body: {} });
  },

  // Create -  Method to store
  store: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty() || !req.files[0]) {
      res.locals.errors = errors.mapped();
      res.locals.body = req.body;
      res.locals.brands = await db.Brands.findAll();
      res.locals.categories = await db.Categories.findAll();
      if (!req.files[0]) {
        res.locals.errors.image = "Ingresa una foto de tu producto!";
      }
      return res.render("product-create-form");
    }

    const { title, description, brand, category, price } = req.body;

    const producModel = {
      title,
      brand_id: brand,
      category_id: category,
      price,
      description,
      photo: `/images/products/${req.files[0].originalname}`,
      stock: 100,
    };

    const productCreated = await db.Product.create(producModel);
    res.redirect(`/products/${productCreated.id}`);
  },

  // Update - Form to edit
  edit: async (req, res) => {
    const id = req.params.productId;

    const product = await db.Product.findByPk(id);

    res.locals.brands = await db.Brands.findAll();
    res.locals.category = await db.Categories.findByPk(product.category_id);
    res.locals.product = product;

    res.render("product-edit-form", { errors: {} });
  },
  // Update - Method to update
  update: async (req, res) => {
    const errors = validationResult(req);
    const id = req.params.productId;

    const product = await db.Product.findByPk(id);

    if (!errors.isEmpty()) {
      res.locals.errors = errors.mapped();
      res.locals.brands = await db.Brands.findAll();
      res.locals.category = await db.Categories.findByPk(product.category_id);
      res.locals.product = { ...req.body, id: id };

      return res.render("product-edit-form");
    }

    const { title, description, brand, price } = req.body;

    const producModel = {
      title,
      brand_id: brand,
      price,
      description,
      stock: 100,
    };
    if (req.files[0]) {
      await db.Product.update(
        {
          ...producModel,
          photo: `/images/products/${req.files[0].originalname}`,
        },
        { where: { id: id } }
      );
    } else {
      await db.Product.update(producModel, { where: { id: id } });
    }

    res.redirect(`/products/${id}`);
  },

  // Delete - Delete one product from DB
  destroy: async (req, res) => {
    const id = req.params.productId;

    await db.Product.destroy({ where: { id } });

    res.redirect("/products");
  },
};

module.exports = controller;
