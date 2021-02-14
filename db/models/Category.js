module.exports = (sequelize, dataTypes) => {
	const Category = sequelize.define(
		'Categories',
		{
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: dataTypes.INTEGER,
			},
			name: dataTypes.STRING(100),
		 
		},
		{
			timestamps: false,

 
		}
	)

	Category.associate=function(models){
	    Category.hasMany(models.Product,{
	        as:'products',
	        foreignKey:'category_id'
	    })
	    // Provider.belongsTo(models.categories,{
	    //     as: "categories",
	    //     foreignKey: "categorieId"

	    // });

	    // Provider.belongsToMany(models.Users, {
	    //     as:'users',
		// 	through: 'shoppinghistory',
		// 	foreignKey: 'providerId',
		// 	otherKey: 'userId',
		// 	timestamps: false,
		// })

	}

	return Category
}
