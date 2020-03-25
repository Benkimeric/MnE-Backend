import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqid from 'uniqid';

import models from '../../database/models';

const { Op } = models.Sequelize;

const role = {
  include: [
    {
      model: models.Role,
      as: 'roles',
      attributes: ['id', 'roleName'],
      through: { attributes: [] },
    },
  ],
  attributes: { exclude: ['password'] },
};

class UserHelper {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  static hashPin(pin) {
    return bcrypt.hashSync(pin.toString(), bcrypt.genSaltSync(8));
  }

  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * Generate Token
   * @param {object} userInfo
   * @returns {string} token
   */
  static generateToken(userInfo) {
    const data = {
      userId: userInfo.dataValues.userId,
      fullName: userInfo.dataValues.fullName,
      gender: userInfo.dataValues.gender,
      email: userInfo.dataValues.email,
      roles: userInfo.dataValues.roles,
    };
    const token = jwt.sign(
      {
        userInfo: data,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );
    return token;
  }

  static async getUserFromDb(query) {
    const user = await models.User.findOne(query);
    return user;
  }

  // exclude the password number && paranoid is false
  static async findUser(userId, email, query) {
    const idNumber = userId || '';
    const userEmail = email || '';
    const defaultQuery = {
      where: {
        [Op.or]: [
          { userId: idNumber },
          { email: `${userEmail.toLowerCase()}` },
        ],
      },
    };
    const userQuery = query
      ? { ...query, ...role }
      : { ...defaultQuery, ...role };
    const user = await UserHelper.getUserFromDb(userQuery);
    return user;
  }

  static async findUsers(query) {
    const userQuery = query ? { ...role, ...query } : { ...role };
    const users = await models.User.findAll(userQuery);
    return users;
  }

  static async createUser(fullName, gender, email, password) {
    const newUser = await models.User.create({
      userId: uniqid(),
      fullName: fullName.toLowerCase(),
      gender: gender.toLowerCase(),
      email: email.toLowerCase(),
      password: UserHelper.hashPin(password),
    });
    await models.UserRole.create({ userId: newUser.userId, roleId: '1111' });

    return newUser;
  }

  static async updateUser(fullName, gender, email, userId) {
    const updatedUser = await models.User.update(
      {
        fullName,
        gender,
        email,
      },
      { where: { userId }, returning: true, plain: true }
    );

    return updatedUser[1]?.dataValues;
  }

  static async destroyUser(userId) {
    const deletedUser = await models.User.destroy({
      where: { userId },
      returning: true,
      plain: true,
    });

    return deletedUser;
  }
}

export default UserHelper;
