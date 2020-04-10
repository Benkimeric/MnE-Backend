import Joi from '@hapi/joi';
import UserHelper from '../helpers/users';
import ResponseHandler from '../helpers/responseHandler';
import models from '../database/models';

class UserMiddleware {
  static validateLoginData(req, res, next) {
    const { body } = req;
    const schema = Joi.object().keys({
      email: Joi.string()
        .trim()
        .required(),
      password: Joi.string()
        .trim()
        .required(),
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
        email: `${email.toLowerCase()}`,
      },
      include: [
        {
          model: models.Role,
          as: 'roles',
          attributes: ['id', 'roleName'],
          through: { attributes: [] },
        },
      ],
    };
    const user = await UserHelper.getUserFromDb(query);
    if (
      !user
      || !UserHelper.comparePassword(user.dataValues.password, password)
    ) {
      return ResponseHandler.handleError(
        'The credentials you provided are incorrect',
        400,
        res
      );
    }

    delete user.dataValues.password;
    req.user = user;
    return next();
  }

  static async checkExistingEmail(req, res, next) {
    const { email } = req.body;
    if (email) {
      const user = await UserHelper.findUser(null, email);
      if (user) {
        return ResponseHandler.handleError(
          'An account with same email already exists',
          400,
          res
        );
      }
    }
    return next();
  }

  static async validateAddUser(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
        })
        .required(),

      fullName: Joi.string()
        .strip()
        .required(),

      gender: Joi.string()
        .lowercase()
        .strip()
        .required()
        .valid('female', 'male'),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return ResponseHandler.handleError(
        error.details.map((errorMsg) => ({
          error: errorMsg.message,
          key: errorMsg.path[0],
        })),
        422,
        res
      );
    }
    return next();
  }

  static async checkExistingId(req, res, next) {
    const { userId } = req.params;

    const user = await UserHelper.findUser(userId, null, null);

    if (!user) {
      return ResponseHandler.handleError(
        'An account with provided user ID does not exist',
        404,
        res
      );
    }
    req.userData = user;
    return next();
  }

  static async checkUpdateExistingEmail(req, res, next) {
    const { body } = req;
    const { userId } = req.params;
    const { email } = body;
    const user = await UserHelper.findUser(null, email);
    if (user && (user.userId !== userId)) {
      return ResponseHandler.handleError(
        'An account with same email already exists',
        400,
        res
      );
    }
    return next();
  }

  static async validateUpdateUserData(req, res, next) {
    const schema = Joi.object().keys({
      fullName: Joi.string().strip(),
      email: Joi.string().email(),
      gender: Joi.string()
        .lowercase()
        .strip()
        .valid('female', 'male'),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return ResponseHandler.handleError(
        error.details.map((errorMsg) => ({
          error: errorMsg.message,
          key: errorMsg.path[0],
        })),
        422,
        res
      );
    }
    return next();
  }
}
export default UserMiddleware;
