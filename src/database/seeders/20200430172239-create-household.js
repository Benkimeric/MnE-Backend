module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Households',
    [
      {
        uniqueId: 'TC/001/2020',
        fullName: 'Jame JJ',
        idNumber: 111111,
        birthDate: '2018-08-16',
        mobile: '+254717892018',
        occupation: 'Business Man',
        centerId: 1,
        setup: 'Family setup',
        count: 8,
        income: 20000,
        vulnerability: 'low',
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
  ) => queryInterface.bulkDelete('Households', null, {}),
};
