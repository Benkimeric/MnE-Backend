import { Router } from 'express';
import UserController from './usersController';
import middlewares from '../../middlewares';

const { Authentication, RoleMiddleware, UsersMiddleware } = middlewares;

const UserRouter = Router();

UserRouter.post(
  '/login',
  UsersMiddleware.validateLoginData,
  UsersMiddleware.validateLoginCredentials,
  UserController.userLogin,
);

UserRouter.get(
  '/users',
  Authentication,
  RoleMiddleware.checkUserRole([
    'Super Administrator',
  ]),
  UserController.getAllUsers,
);

export default UserRouter;
