
import UserRouter from './users';

const apiPrefix = '/api/v1';

// add your route to this list
const routes = [
  UserRouter,
];

export default (app) => {
  routes.forEach((route) => app.use(apiPrefix, route));
  return app;
};
