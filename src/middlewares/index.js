import UsersMiddleware from './usersMiddleware';
import Authentication from './authenticationMiddleware';
import RoleMiddleware from './roleMiddleware';

const middleware = {
  Authentication,
  RoleMiddleware,
  UsersMiddleware,
};

export default middleware;
