module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      userId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      roleId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      updatedAt: false,
    }
  );
  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return UserRole;
};
