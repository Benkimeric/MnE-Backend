module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Centers',
    [
      {
        name: 'Tatu City',
        code: 'TC',
        createdAt: '2018-08-16 012:11:52.181+01',
        updatedAt: '2018-08-16 012:11:52.181+01',
      },
    ],
    {},
  ),

  down: (
    queryInterface,
    Sequelize, //eslint-disable-line
  ) => queryInterface.bulkDelete('Centers', null, {}),
};
