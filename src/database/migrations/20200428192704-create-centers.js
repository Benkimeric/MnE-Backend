module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Centers', {
    centerId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    code: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Households'),
};
