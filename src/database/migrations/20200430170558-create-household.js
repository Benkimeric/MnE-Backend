module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Households', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    uniqueId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    idNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    birthDate: {
      allowNull: false,
      type: Sequelize.DATEONLY,
    },
    mobile: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    occupation: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    centerId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Centers',
        key: 'centerId',
        onDelete: 'SET NULL',
      }
    },
    setup: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    count: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    income: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    vulnerability: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Households'),
};
