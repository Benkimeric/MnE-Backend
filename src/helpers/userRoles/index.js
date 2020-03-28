import models from '../../database/models';

class UserRoleHelper {
  static async createUserRoles(data) {
    const { userId, roleId } = data;
    const response = await models.UserRole.create({ roleId, userId });
    return response;
  }

  static async deleteUserRoles(data) {
    const { userId, roleId } = data;
    const response = await models.UserRole.destroy({
      where: {
        roleId, userId
      }
    });
    return response;
  }

  static async findUserRoles(data) {
    const { userId, roleId } = data;
    const response = await models.UserRole.findOne({
      where: {
        roleId, userId
      }
    });
    return response;
  }
}

export default UserRoleHelper;
