import UsersMiddleware from './usersMiddleware';
import Authentication from './authenticationMiddleware';
import RoleMiddleware from './roleMiddleware';
import HouseholdMiddleware from './householdsMiddleware';
import CenterMiddleware from './centerMiddleware';

const middleware = {
  Authentication,
  RoleMiddleware,
  UsersMiddleware,
  HouseholdMiddleware,
  CenterMiddleware,
};

export default middleware;
