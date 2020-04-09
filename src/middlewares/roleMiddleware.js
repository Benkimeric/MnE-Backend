import UserHelper from '../helpers/users';
import ResponseHandler from '../helpers/responseHandler';
import models from '../database/models';
import UserRoleHelper from '../helpers/userRoles';

class RoleMiddleware {
  static checkUserRole(allowedRoles) {
    return async (req, res, next) => {
      const { userId } = req.user;
      try {
        const user = await UserHelper.findUser(userId);
        // Check whether user has any of the allowedRoles
        const hasPermission = user.roles.some((role) => allowedRoles
          .includes(role.roleName));
        if (!hasPermission) {
          const error = 'You don\'t have access to perform this action';
          return ResponseHandler.handleError(error, 403, res);
        }
        req.user.roles = user.dataValues.roles;
        next();
      } catch (error) {
        const message = 'You are not signed in to the application';
        return ResponseHandler.handleError(message, 400, res);
      }
    };
  }

  static async checkRoleId(req, res, next) {
    const { roleId } = req.query;
    const role = await models.Role.findByPk(roleId || '0000');
    if (roleId && !role) {
      const error = 'Role does not exist';
      return ResponseHandler.handleError(error, 404, res);
    }
    return next();
  }

  static async checkUserExist(req, res, next) {
    const { email } = req.body;
    const user = await UserHelper.findUser(null, email);
    if (!user) {
      const error = 'User does not exist';
      return ResponseHandler.handleError(error, 404, res);
    }
    req.userRole = user;
    return next();
  }

  static async checkUserRoleExist(req, res, next) {
    const { userRole, query, } = req;
    const { roleId } = query;
    const { roles } = userRole;
    const hasRole = roles.find((role) => parseInt(role.id, 10) === parseInt(roleId, 10));

    if (hasRole) {
      const error = 'User already has that role';
      return ResponseHandler.handleError(error, 400, res);
    }
    return next();
  }

  static async checkUserRoleNotExist(req, res, next) {
    const { userRole, query, } = req;
    const { roleId } = query;
    const { userId } = userRole;
    const hasRole = await UserRoleHelper.findUserRoles({ userId, roleId });
    if (!hasRole) {
      const error = 'User does not have that role';
      return ResponseHandler.handleError(error, 400, res);
    }
    return next();
  }
}
export default RoleMiddleware;
