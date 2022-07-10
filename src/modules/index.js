
import UserRouter from './users';
import RoleRouter from './roles';
import HouseholdRouter from './households';
import CenterRouter from './centers';

const apiPrefix = '/api/v1';

// add your route to this list
const routes = [
  UserRouter,
  RoleRouter,
  HouseholdRouter,
  CenterRouter,
];

export default (app) => {
  routes.forEach((route) => app.use(apiPrefix, route));
  return app;
};
