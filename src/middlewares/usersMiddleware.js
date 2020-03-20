
class UserMiddleware {
  static async validateUserData(req, res, next) {
    const { body } = req;

    // perform any validations
    if (!body) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Inputs'
      });
    }
    return next();
  }
}
export default UserMiddleware;
