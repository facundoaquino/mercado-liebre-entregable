module.exports = (sequelize, dataTypes) => {
	const User = sequelize.define(
		'User',
		{
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: dataTypes.INTEGER,
			},
			email: dataTypes.STRING(100),
			password: dataTypes.STRING(100),
			avatar: dataTypes.STRING(100),
		 
		},
		{
			timestamps: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',

 
		}
	)

	

	return User
}
