export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      foreignKey: 'roleId',
      as: 'users',
      through: models.UserRole
    });
  };
  return Role;
};
