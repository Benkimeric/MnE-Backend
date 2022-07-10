import ResponseHandler from '../../helpers/responseHandler';
import CenterHelper from '../../helpers/centers';

class CentersController {
  static async getCenters(req, res) {
    const { centerId } = req.query;
    try {
      const whereClause = {
        where: {
          centerId
        }
      };
      const query = centerId ? whereClause : null;
      const centers = await CenterHelper.findCenters(query);
      const data = centerId ? { center: centers[0] } : { centers };
      const message = `Center${centerId ? '' : 's'} fetched successfully`;
      return ResponseHandler.handleSuccess(message, data, 200, res);
    } catch (error) {
      return ResponseHandler.handleError('Server Error', 500, res);
    }
  }
}

export default CentersController;
