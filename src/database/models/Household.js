module.exports =  (sequelize, DataTypes) => {
  const Household = sequelize.define('Household', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    uniqueId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    birthDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    mobile: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    occupation: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    centerId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    setup: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    count: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    income: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    vulnerability: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  { paranoid: true });
  Household.associate = (models) => {
    Household.belongsTo(models.Center, {
      foreignKey: 'centerId',
      as: 'center',
    });
  };
  return Household;
};
