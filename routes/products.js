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



// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create',upload.any(), productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/:productId', productsController.show); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:productId/edit', productsController.edit); 
router.put('/:productId/update',upload.any(), productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
