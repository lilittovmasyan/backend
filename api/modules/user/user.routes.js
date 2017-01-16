import { Router } from 'express';
import * as userHandlers from './user.handlers';

export function init(api) {
  const router = new Router();

  router.get('/', userHandlers.getUsers);
  router.post('/', userHandlers.setUsers);

  api.use('/users', router);
}