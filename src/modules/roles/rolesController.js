import ResponseHandler from '../../helpers/responseHandler';
import RoleHelper from '../../helpers/roles';
import UserRoleHelper from '../../helpers/userRoles';

class RolesController {
  static async getAllRoles(req, res) {
    const { roleId } = req.query;
    try {
      const whereClause = {
        where: {
          id: roleId
        }
      };
      const query = roleId ? whereClause : null;
      const roles = await RoleHelper.findRoles(query);
      const data = roleId ? { role: roles[0] } : { roles };
      const message = `Role${roleId ? '' : 's'} fetched successfully`;
      return ResponseHandler.handleSuccess(message, data, 200, res);
    } catch (error) {
      return ResponseHandler.handleError('Server Error', 500, res);
    }
  }

  static async assignUserRole(req, res) {
    const { query, userRole } = req;
    const { roleId } = query;
    const { userId } = userRole;
    try {
      const response = await UserRoleHelper.createUserRoles({ userId, roleId });
      const message = 'User assigned role successfully';
      return ResponseHandler.handleSuccess(message, response, 201, res);
    } catch (error) {
      return ResponseHandler.handleError('Server Error', 500, res);
    }
  }

  static async deleteUserRole(req, res) {
    const { query, userRole } = req;
    const { roleId } = query;
    const { userId } = userRole;

    try {
      const response = await UserRoleHelper.deleteUserRoles({ userId, roleId });
      const message = 'User removed successfully';
      return ResponseHandler.handleSuccess(message, response, 201, res);
    } catch (error) {
      return ResponseHandler.handleError('Server Error', 500, res);
    }
  }
}

export default RolesController;
