import models from '../../database/models';

class CenterHelper {
  static async findCenters(query) {
    const centerQuery = query ? { ...query } : { };
    const center = await models.Center.findAll(centerQuery);
    return center;
  }
}

export default CenterHelper;
