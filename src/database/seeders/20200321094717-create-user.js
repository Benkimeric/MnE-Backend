module.exports = {
  // eslint-disable-next-line
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        userId: '1',
        fullName: 'Bolton',
        email: 'bolton@gmail.com',
        gender: 'male',
        password: '$2b$08$7pGrwYhc4E7fzH0rQQSufOG5LWadtSANYFELXOegO..7InMyuLi8S',
        createdAt: '2018-08-16 012:11:52.181+01',
        updatedAt: '2018-08-16 012:11:52.181+01',
        deletedAt: null,
      },
      {
        userId: '2',
        fullName: 'Benkim',
        email: 'benkim@gmail.com',
        gender: 'male',
        password: '$2b$08$nVJcJzQ1utTWsxqbM1mBDeUbH8Y2/Acfin0mOekVDmXB1VY1Ic55K',
        createdAt: '2018-08-16 012:11:52.181+01',
        updatedAt: '2018-08-16 012:11:52.181+01',
        deletedAt: null,
      },
      {
        userId: '3',
        fullName: 'Jane Doe',
        email: 'janedoe@gmail.com',
        gender: 'female',
        password: '$2b$08$nVJcJzQ1utTWsxqbM1mBDeUbH8Y2/Acfin0mOekVDmXB1VY1Ic55K',
        createdAt: '2018-08-16 012:11:52.181+01',
        updatedAt: '2018-08-16 012:11:52.181+01',
        deletedAt: null,
      },
    ],
    {},
  ),

  down: (
    queryInterface,
    Sequelize, //eslint-disable-line
  ) => queryInterface.bulkDelete('Roles', null, {}),
};
