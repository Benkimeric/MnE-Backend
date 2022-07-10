import ResponseHandler from "../../helpers/responseHandler";
import HouseholdHelper from "../../helpers/households";

class HouseholdsController {
  static async getHouseholds(req, res) {
    const { householdId } = req.query;
    try {
      const whereClause = {
        where: {
          id: householdId,
        },
      };
      const query = householdId ? whereClause : null;
      const households = await HouseholdHelper.findHouseholds(query);
      const data = householdId ? { household: households[0] } : { households };
      const message = `Household${householdId ? "" : "s"} fetched successfully`;
      return ResponseHandler.handleSuccess(message, data, 200, res);
    } catch (error) {
      return ResponseHandler.handleError("Server Error", 500, res);
    }
  }

  static async createHouseholds(req, res) {
    try {
      const { body, center } = req;
      const { centerId } = body;
      const { code } = center;
      const year = new Date().getFullYear();
      const query = {
        where: { centerId },
        paranoid: false,
      };
      const households = await HouseholdHelper.findHouseholds(query);
      const householdIds = households.map((household) => household.uniqueId);
      const sortedIds = householdIds.sort((a, b) => b.localeCompare(a));
      const newMiddleId = HouseholdHelper.incrementMiddleId(sortedIds[0]);
      const uniqueId = [code, newMiddleId, year].join("/");
      const household = await HouseholdHelper.createHousehold({
        ...body,
        uniqueId,
      });
      return ResponseHandler.handleSuccess(
        "Household created successfully",
        { household },
        201,
        res
      );
    } catch (error) {
      return ResponseHandler.handleError("Server Error", 500, res);
    }
  }

  static async updateHousehold(req, res) {
    try {
      const { body } = req;
      const { householdId } = req.params;
      const household = await HouseholdHelper.updateHousehold(
        body,
        householdId
      );
      return ResponseHandler.handleSuccess(
        "Household updated successfully",
        { household },
        200,
        res
      );
    } catch (error) {
      return ResponseHandler.handleError("Server Error", 500, res);
    }
  }

  static async deleteHousehold(req, res) {
    try {
      const { householdId } = req.params;
      const household = await HouseholdHelper.destroyHousehold(householdId);

      return ResponseHandler.handleSuccess(
        "Household deleted successfully",
        { household },
        200,
        res
      );
    } catch (error) {
      return ResponseHandler.handleError("Server Error", 500, res);
    }
  }

  static async restoreHousehold(req, res) {
    try {
      const { householdId } = req.params;
      const household = await HouseholdHelper.restoreHousehold(householdId);
      const message = household
        ? "Household restored successfully"
        : "Household with the given Id does not exist";
      const status = household ? 200 : 404;

      if (!household) {
        return ResponseHandler.handleError(message, status, res);
      }

      return ResponseHandler.handleSuccess(message, { household }, status, res);
    } catch (error) {
      return ResponseHandler.handleError("Server Error", 500, res);
    }
  }
}

export default HouseholdsController;
