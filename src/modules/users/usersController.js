import UserHelper from '../../helpers/users';
import ResponseHandler from '../../helpers/responseHandler';

class UsersController {
  static async userLogin(req, res) {
    const { user } = req;
    try {
      const token = UserHelper.generateToken(user);
      const data = {
        token
      };
      return ResponseHandler.handleSuccess('Login successful', data, 200, res);
    } catch (error) {
      return ResponseHandler.handleError('Server Error', 500, res);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserHelper.findUsers();
      const data = {
        users
      };
      return ResponseHandler.handleSuccess('Users fetched successfully', data, 200, res);
    } catch (error) {
      return ResponseHandler.handleError('Server Error', 500, res);
    }
  }
}

export default UsersController;
