import Joi from '@hapi/joi';
import UserHelper from '../helpers/users';
import ResponseHandler from '../helpers/responseHandler';
import models from '../database/models';

class UserMiddleware {
  static validateLoginData(req, res, next) {
    const { body } = req;
    const schema = Joi.object().keys({
      email: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    });
    const { error } = schema.validate(body);
    if (error) {
      return ResponseHandler.handleError('Invalid or Missing inputs', 422, res);
    }

    return next();
  }

  static async validateLoginCredentials(req, res, next) {
    const { email, password } = req.body;
    const query = {
      where: {
        email: `${email.toLowerCase()}`
      },
      include: [
        {
          model: models.Role,
          as: 'roles',
          attributes: ['id', 'roleName'],
          through: { attributes: [] }
        }
      ]
    };
    const user = await UserHelper.getUserFromDb(query);
    if (!user || !UserHelper.comparePassword(user.dataValues.password, password)) {
      return ResponseHandler.handleError('The credentials you provided are incorrect', 400, res);
    }

    delete user.dataValues.password;
    req.user = user;
    return next();
  }
}
export default UserMiddleware;
