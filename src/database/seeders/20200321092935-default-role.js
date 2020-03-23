module.exports = {
  // eslint-disable-next-line
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Roles',
    [
      {
        id: 1000,
        roleName: 'Super Administrator',
        description: 'Can perform all task on',
        createdAt: '2018-08-16 012:11:52.181+01',
        updatedAt: '2018-08-16 012:11:52.181+01',
      },
      {
        id: 1111,
        roleName: 'Administrator',
        description: 'Can only ',
        createdAt: '2020-01-01 012:11:52.181+01',
        updatedAt: '2020-01-01 012:11:52.181+01',
      },
    ],
    {},
  ),

  down: (
    queryInterface,
    Sequelize, //eslint-disable-line
  ) => queryInterface.bulkDelete('Roles', null, {}),
};
