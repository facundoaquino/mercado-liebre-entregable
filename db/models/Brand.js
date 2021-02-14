module.exports = (sequelize, dataTypes) => {
	const Brand = sequelize.define(
		'Brands',
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

	Brand.associate = function (models) {
		Brand.hasMany(models.Product, {
			as: 'products',
			foreignKey: 'brand_id',
		})
	 
	}

	return Brand
}
