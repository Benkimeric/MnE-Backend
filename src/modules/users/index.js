import { Router } from 'express';
import UserController from './usersController';
import middlewares from '../../middlewares';

const { UsersMiddleware } = middlewares;

const UserRouter = Router();

UserRouter.post(
  '/user',
  UsersMiddleware.validateUserData,
  UserController.mainFunction,
);

export default UserRouter;
