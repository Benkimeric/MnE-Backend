import UserHelper from '../../helpers/users';
import ResponseHandler from '../../helpers/responseHandler';

class UsersController {
  static async userLogin(req, res) {
    const { user } = req;
    try {
      const token = UserHelper.generateToken(user);
      const data = {
        token,
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
        users,
      };
      return ResponseHandler.handleSuccess(
        'Users fetched successfully',
        data,
        200,
        res
      );
    } catch (error) {
      return ResponseHandler.handleError('Server Error', 500, res);
    }
  }

  static async addUser(req, res) {
    try {
      const { email, fullName, gender } = req.body;
      const defaultPassword = 'Mne2020';
      const user = await UserHelper.createUser(
        fullName,
        gender,
        email,
        defaultPassword
      );

      return ResponseHandler.handleSuccess(
        'New user created successfully',
        { user },
        201,
        res
      );
    } catch (error) {
      return ResponseHandler.handleError('Server Error', 500, res);
    }
  }

  static async updateUser(req, res) {
    try {
      const { fullName, gender, email } = req.body;
      const { userId } = req.params;
      const user = await UserHelper.updateUser(fullName, gender, email, userId);

      return ResponseHandler.handleSuccess(
        'User updated successfully',
        { user },
        200,
        res
      );
    } catch (error) {
      return ResponseHandler.handleError('Server Error', 500, res);
    }
  }

  static async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await UserHelper.destroyUser(userId);

      return ResponseHandler.handleSuccess(
        'User deleted successfully',
        { user },
        200,
        res
      );
    } catch (error) {
      return ResponseHandler.handleError('Server Error', 500, res);
    }
  }
}

export default UsersController;
