// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ multer ************

const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/images/products')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	},
})

const upload = multer({ storage: storage })

// ************ validations ************

 
const validate = require('../helpers/validationInput');


// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ local middleware ************

const userLogued = require("../middlewares/userLogued");

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', userLogued ,upload.any(),validate('title','description','price'), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:productId', productsController.show); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:productId/edit', productsController.edit); 
router.patch('/:productId/update',  userLogued, upload.any(),validate('title','description','price'), productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/:productId/delete', userLogued ,productsController.destroy); 

 



module.exports = router;
