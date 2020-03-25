module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserRoles', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      allowNull: false,
      type: Sequelize.STRING,
      references: {
        model: 'Users',
        key: 'userId',
        onDelete: 'CASCADE',
      }
    },
    roleId: {
      allowNull: false,
      type: Sequelize.STRING,
      references: {
        model: 'Roles',
        key: 'id',
        onDelete: 'CASCADE',
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('UserRoles'),
};
