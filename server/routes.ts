import { Router, Application } from 'express';
import FixtureCtrl from './controllers/fixture.js';
import UserCtrl from './controllers/user.js';

const setRoutes = (app: Application): void => {
  const router = Router();
  const fixtureCtrl = new FixtureCtrl();
  const userCtrl = new UserCtrl();

  // fixture
  router.route('/matches').get(fixtureCtrl.getAll);
  router.route('/fixture').post(fixtureCtrl.insert);
  router.route('/fixture/:id').get(fixtureCtrl.get);
  router.route('/fixture/:id').put(fixtureCtrl.update);
  router.route('/fixture/:id').delete(fixtureCtrl.delete);

  // user
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  app.use('/api', router);

};

export default setRoutes;
