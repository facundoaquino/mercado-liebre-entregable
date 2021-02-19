const express=require('express')
const router = express.Router()

const db = require("../db/models");
const { Op } = db.Sequelize;

router.get('/searchproducts', async(req,res)=>{
	if(req.query.keyword!=''){


    const products = await db.Product.findAll({ where: {
      title: { [Op.like]: `%${req.query.keyword}%` },
    }})
    // const productsTitle = products.map(product=>product.title.split(' ')[0])
  
    const productsTitle = products.reduce((acumulator,product)=>{
      const title = product.title.split(' ')[0].toLowerCase()
        acumulator.includes(title)?'':acumulator.push(title)
        return  acumulator
    },[])
      res.send(productsTitle)
  }else{res.send([])}
	} )

module.exports=router