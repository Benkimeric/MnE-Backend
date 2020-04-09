
import UserRouter from './users';
import RoleRouter from './roles';

const apiPrefix = '/api/v1';

// add your route to this list
const routes = [
  UserRouter,
  RoleRouter,
];

export default (app) => {
  routes.forEach((route) => app.use(apiPrefix, route));
  return app;
};
