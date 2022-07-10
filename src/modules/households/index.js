import { Router } from 'express';
import HouseholdController from './householdsController';
import middlewares from '../../middlewares';

const {
  Authentication, RoleMiddleware,
  HouseholdMiddleware, CenterMiddleware
} = middlewares;

const HouseholdRouter = Router();

HouseholdRouter.get(
  '/households',
  Authentication,
  RoleMiddleware.checkUserRole(['Super Administrator']),
  HouseholdMiddleware.checkHouseholdIdQuery,
  HouseholdController.getHouseholds
);

HouseholdRouter.post(
  '/households',
  Authentication,
  RoleMiddleware.checkUserRole(['Super Administrator']),
  HouseholdMiddleware.validateHouseholdData,
  HouseholdMiddleware.checkExistingPhone,
  HouseholdMiddleware.checkExistingIdNumber,
  CenterMiddleware.checkCenterIdExist,
  HouseholdController.createHouseholds
);

HouseholdRouter.patch(
  '/households/:householdId',
  Authentication,
  RoleMiddleware.checkUserRole(['Super Administrator']),
  HouseholdMiddleware.checkHouseholdIdExist,
  HouseholdMiddleware.validateHouseholdUpdateData,
  HouseholdMiddleware.checkUpdateExistingPhone,
  HouseholdMiddleware.checkUpdateExistingIdNumber,
  HouseholdController.updateHousehold
);

HouseholdRouter.delete(
  '/households/:householdId',
  Authentication,
  RoleMiddleware.checkUserRole(['Super Administrator']),
  HouseholdMiddleware.checkHouseholdIdExist,
  HouseholdController.deleteHousehold
);

HouseholdRouter.delete(
  '/households/restore/:householdId',
  Authentication,
  RoleMiddleware.checkUserRole(['Super Administrator']),
  HouseholdController.restoreHousehold
);

export default HouseholdRouter;
