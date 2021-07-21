import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import FavUserPetsController from '../controllers/FavUserPetsController';


const favsRoutes = Router();

const favsController = new FavUserPetsController();

favsRoutes.use(ensureAuthenticated);

favsRoutes.post('/', celebrate({
  [Segments.BODY]: {
    pets_id: Joi.string().uuid().required(),
  },
}), favsController.create);
favsRoutes.get('/', favsController.index);
favsRoutes.delete('/:id', favsController.delete);

export default favsRoutes;