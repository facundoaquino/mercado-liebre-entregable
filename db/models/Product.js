module.exports = (sequelize, dataTypes) => {
	const Product = sequelize.define(
		'Product',
		{
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: dataTypes.INTEGER,
			},
			title: dataTypes.STRING(100),
			description: dataTypes.STRING,
			photo: dataTypes.STRING(100),
			price: dataTypes.FLOAT(10, 2),
			stock: dataTypes.INTEGER,
			brand_id: dataTypes.INTEGER,
			category_id: dataTypes.INTEGER,
		},
		{
			timestamps: true,
			paranoid:true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
		}
	)

	Product.associate=function(models){
	    Product.belongsTo(models.Categories,{
	        as:'category',
	        foreignKey:'category_id'
	    })
        Product.belongsTo(models.Brands,{
	        as:'brand',
	        foreignKey:'brand_id'
	    })
	     

	}

	return Product
}
