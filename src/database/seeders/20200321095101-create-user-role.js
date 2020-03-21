module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'UserRoles',
    [
      {
        id: 1,
        userId: 1,
        roleId: 1000,
        createdAt: '2018-08-16 012:11:52.181+01',
      },
      {
        id: 2,
        userId: 2,
        roleId: 1000,
        createdAt: '2018-08-16 012:11:52.181+01',
      },
      {
        id: 3,
        userId: 3,
        roleId: 1111,
        createdAt: '2018-08-16 012:11:52.181+01',
      },
    ],
    {},
  ),

  down: (
    queryInterface,
    Sequelize, //eslint-disable-line
  ) => queryInterface.bulkDelete('Roles', null, {}),
};
