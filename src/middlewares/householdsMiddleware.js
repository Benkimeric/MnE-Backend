import Joi from '@hapi/joi';
import ResponseHandler from '../helpers/responseHandler';
import models from '../database/models';
import HouseholdHelper from '../helpers/households';

class HouseholdMiddleware {
  static async checkHouseholdIdQuery(req, res, next) {
    const { householdId } = req.query;
    const household = await models.Household.findByPk(householdId || '0000');
    if (householdId && !household) {
      const error = 'Household does not exist';
      return ResponseHandler.handleError(error, 404, res);
    }
    return next();
  }

  static validateHouseholdData(req, res, next) {
    const { body } = req;
    const schema = Joi.object().keys({
      fullName: Joi.string()
        .trim()
        .required(),
      idNumber: Joi.number()
        .required(),
      birthDate: Joi.string()
        .trim()
        .required(),
      mobile: Joi.string()
        .trim().regex(/^(\+254(7|1)\d{8})$/)
        .required(),
      occupation: Joi.string()
        .trim()
        .required(),
      centerId: Joi.number()
        .required(),
      setup: Joi.string()
        .trim()
        .required(),
      count: Joi.number()
        .required(),
      income: Joi.number()
        .required(),
      vulnerability: Joi.string().lowercase().valid('low', 'moderate', 'high').required()
    });
    const { error } = schema.validate(body);
    if (error) {
      return ResponseHandler.handleError('Invalid or Missing inputs', 422, res);
    }

    return next();
  }

  static async checkExistingPhone(req, res, next) {
    const { body } = req;
    const { mobile } = body;
    const household = await HouseholdHelper.findHousehold(null, mobile);
    if (household) {
      return ResponseHandler.handleError(
        'An account with same mobile already exists',
        400,
        res
      );
    }
    return next();
  }

  static async checkExistingIdNumber(req, res, next) {
    const { body } = req;
    const { idNumber } = body;
    const household = await HouseholdHelper.findHousehold(null, null, idNumber);
    if (household) {
      return ResponseHandler.handleError(
        'An account with same ID number already exists',
        400,
        res
      );
    }
    return next();
  }

  static async checkHouseholdIdExist(req, res, next) {
    const { householdId } = req.params;
    const household = await models.Household.findByPk(householdId);
    if (!household) {
      return ResponseHandler.handleError(
        'Household with the given Id does not exist',
        404,
        res
      );
    }
    req.household = household;
    return next();
  }

  static validateHouseholdUpdateData(req, res, next) {
    const { body } = req;
    const schema = Joi.object().keys({
      fullName: Joi.string()
        .trim(),
      idNumber: Joi.number(),
      birthDate: Joi.string()
        .trim(),
      mobile: Joi.string()
        .trim().regex(/^(\+254(7|1)\d{8})$/),
      occupation: Joi.string()
        .trim(),
      centerId: Joi.number(),
      setup: Joi.string()
        .trim(),
      count: Joi.number(),
      income: Joi.number(),
      vulnerability: Joi.string().lowercase().valid('low', 'moderate', 'high'),
    });
    const { error } = schema.validate(body);
    if (error) {
      return ResponseHandler.handleError('Invalid or Missing inputs', 422, res);
    }

    return next();
  }

  static async checkUpdateExistingPhone(req, res, next) {
    const { body } = req;
    const { householdId } = req.params;
    const { mobile } = body;
    const household = await HouseholdHelper.findHousehold(null, mobile);
    if (household && (household.id !== parseInt(householdId, 10))) {
      return ResponseHandler.handleError(
        'An account with same mobile already exists',
        400,
        res
      );
    }
    return next();
  }

  static async checkUpdateExistingIdNumber(req, res, next) {
    const { body } = req;
    const { householdId } = req.params;
    const { idNumber } = body;
    const household = await HouseholdHelper.findHousehold(null, null, idNumber);
    if (household && (household.id !== parseInt(householdId, 10))) {
      return ResponseHandler.handleError(
        'An account with same ID number already exists',
        400,
        res
      );
    }
    return next();
  }
}
export default HouseholdMiddleware;
