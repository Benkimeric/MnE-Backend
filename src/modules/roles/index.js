import { Router } from 'express';
import RolesController from './rolesController';
import middlewares from '../../middlewares';

const { Authentication, RoleMiddleware } = middlewares;

const RoleRouter = Router();

RoleRouter.get(
  '/roles',
  Authentication,
  RoleMiddleware.checkUserRole([
    'Super Administrator',
  ]),
  RoleMiddleware.checkRoleId,
  RolesController.getAllRoles,
);

RoleRouter.post(
  '/roles/user',
  Authentication,
  RoleMiddleware.checkUserRole([
    'Super Administrator',
  ]),
  RoleMiddleware.checkRoleId,
  RoleMiddleware.checkUserExist,
  RoleMiddleware.checkUserRoleExist,
  RolesController.assignUserRole,
);

RoleRouter.delete(
  '/roles/user',
  Authentication,
  RoleMiddleware.checkUserRole([
    'Super Administrator',
  ]),
  RoleMiddleware.checkRoleId,
  RoleMiddleware.checkUserExist,
  RoleMiddleware.checkUserRoleNotExist,
  RolesController.deleteUserRole,
);

export default RoleRouter;
