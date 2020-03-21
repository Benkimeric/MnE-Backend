import UserHelper from '../helpers/users';
import ResponseHandler from '../helpers/responseHandler';

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
}
export default RoleMiddleware;
