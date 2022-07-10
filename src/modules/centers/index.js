import { Router } from 'express';
import CenterController from './centersController';
import middlewares from '../../middlewares';

const {
  Authentication, RoleMiddleware, CenterMiddleware
} = middlewares;

const CenterRouter = Router();

CenterRouter.get(
  '/centers',
  Authentication,
  RoleMiddleware.checkUserRole(['Super Administrator']),
  CenterMiddleware.checkCenterIdQuery,
  CenterController.getCenters
);

export default CenterRouter;
