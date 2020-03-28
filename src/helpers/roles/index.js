import models from '../../database/models';

class RoleHelper {
  static async findRoles(query) {
    const defaultQuery = {
      include: [
        {
          model: models.User,
          as: 'users',
          attributes: ['userId', 'fullName', 'gender', 'email'],
          through: { attributes: [] }
        }
      ],
    };
    const roleQuery = query ? { ...query, ...defaultQuery } : { ...defaultQuery };
    const user = await models.Role.findAll(roleQuery);
    return user;
  }
}

export default RoleHelper;
