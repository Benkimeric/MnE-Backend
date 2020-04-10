import { Router } from 'express';
import UserController from './usersController';
import middlewares from '../../middlewares';

const { Authentication, RoleMiddleware, UsersMiddleware } = middlewares;

const UserRouter = Router();

UserRouter.post(
  '/login',
  UsersMiddleware.validateLoginData,
  UsersMiddleware.validateLoginCredentials,
  UserController.userLogin
);

UserRouter.get(
  '/users',
  Authentication,
  RoleMiddleware.checkUserRole(['Super Administrator']),
  UserController.getAllUsers
);

UserRouter.post(
  '/users',
  Authentication,
  RoleMiddleware.checkUserRole(['Super Administrator']),
  UsersMiddleware.validateAddUser,
  UsersMiddleware.checkExistingEmail,
  UserController.addUser
);

UserRouter.patch(
  '/users/:userId',
  Authentication,
  RoleMiddleware.checkUserRole(['Super Administrator']),
  UsersMiddleware.validateUpdateUserData,
  UsersMiddleware.checkExistingId,
  UsersMiddleware.checkUpdateExistingEmail,
  UserController.updateUser
);

UserRouter.delete(
  '/users/:userId',
  Authentication,
  RoleMiddleware.checkUserRole(['Super Administrator']),
  UsersMiddleware.checkExistingId,
  UserController.deleteUser
);

export default UserRouter;
