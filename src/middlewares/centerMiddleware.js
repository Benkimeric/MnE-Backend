import ResponseHandler from '../helpers/responseHandler';
import models from '../database/models';

class CenterMiddleware {
  static async checkCenterIdExist(req, res, next) {
    const { centerId } = req.body;
    const center = await models.Center.findByPk(centerId);
    if (!center) {
      return ResponseHandler.handleError(
        'Center with the given Id does not exist',
        404,
        res
      );
    }
    req.center = center;
    return next();
  }

  static async checkCenterIdQuery(req, res, next) {
    const { centerId } = req.query;
    const center = await models.Center.findByPk(centerId || 0);
    if (centerId && !center) {
      const error = 'Center does not exist';
      return ResponseHandler.handleError(error, 404, res);
    }
    return next();
  }
}
export default CenterMiddleware;
