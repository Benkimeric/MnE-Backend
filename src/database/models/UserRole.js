export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    'UserRole',
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      roleId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
    },
    {
      updatedAt: false,
    }
  );
  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return UserRole;
};
