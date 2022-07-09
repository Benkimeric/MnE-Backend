module.exports =  (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        type: DataTypes.STRING,
      },
      fullName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      gender: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { paranoid: true }
  );
  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      foreignKey: 'userId',
      as: 'roles',
      through: models.UserRole
    });
  };
  return User;
};
