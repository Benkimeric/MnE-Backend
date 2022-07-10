import { startCase, toLower } from 'lodash';
import models from '../../database/models';

const { Op } = models.Sequelize;

const includes = {
  include: [
    {
      model: models.Center,
      as: 'center',
      attributes: ['centerId', 'name', 'code'],
    },
  ],
  order: [
    ['createdAt', 'DESC'],
  ],
};

class HouseholdHelper {
  static async findHouseholds(query) {
    const roleQuery = query ? { ...query, ...includes } : { ...includes };
    const user = await models.Household.findAll(roleQuery);
    return user;
  }

  static async createHousehold(data) {
    const {
      fullName, idNumber, birthDate, mobile, occupation, setup,
      count, income, vulnerability, centerId, uniqueId,
    } = data;
    const newHouse = await models.Household.create({
      uniqueId,
      fullName: startCase(toLower(fullName)),
      idNumber,
      birthDate,
      mobile,
      occupation: startCase(toLower(occupation)),
      centerId,
      setup: startCase(toLower(setup)),
      count,
      income,
      vulnerability: startCase(toLower(vulnerability)),
    });
    return newHouse;
  }

  static async findHousehold(householdId, mobile, idNumber) {
    const household = householdId || 0;
    const number = mobile || '';
    const id = idNumber || 0;
    const defaultQuery = {
      where: {
        [Op.or]: [
          { id: household },
          { mobile: number },
          { idNumber: id },
        ],
      },
    };
    const user = await models.Household.findOne(defaultQuery);
    return user;
  }

  static async updateHousehold(body, householdId) {
    const {
      fullName, occupation, location, setup
    } = body;
    if (fullName) body.fullName = startCase(toLower(fullName));
    if (occupation) body.occupation = startCase(toLower(occupation));
    if (location) body.location = startCase(toLower(location));
    if (setup) body.setup = startCase(toLower(setup));
    const updatedHousehold = await models.Household.update(
      { ...body },
      { where: { id: householdId }, returning: true, plain: true }
    );

    return updatedHousehold[1]?.dataValues;
  }

  static async destroyHousehold(householdId) {
    const response = await models.Household.destroy({
      where: { id: householdId },
      returning: true,
      plain: true,
    });

    return response;
  }

  static async restoreHousehold(householdId) {
    const response = await models.Household.restore({
      where: { id: householdId },
      returning: true,
      plain: true,
    });

    return response;
  }

  static incrementMiddleId(lastId) {
    const number = (lastId || '').split('/')[1];
    const id = parseInt(number || 0, 10) + 1;
    if (id < 100) {
      return (`0000${id}`).substr(-3);
    }
    return id;
  }
}

export default HouseholdHelper;
