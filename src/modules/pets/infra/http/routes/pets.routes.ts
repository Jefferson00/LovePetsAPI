import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import PetsController from '../controllers/PetsController';
import PetsUserController from '../controllers/PetsUserController';


const petsRouter = Router();

const petsController = new PetsController();
const petsUserController = new PetsUserController();


petsRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().allow(''),
            species: Joi.string().required(),
            age: Joi.string().required(),
            description: Joi.string().required(),
            gender: Joi.string().required(),
            is_adopt: Joi.boolean().required(),
            location_lat: Joi.string().required(),
            location_lon: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
        }
    }),
    ensureAuthenticated,
    petsController.create
);


petsRouter.get('/', petsController.index);
petsRouter.get('/find/:id', petsController.find);
petsRouter.get('/me', ensureAuthenticated, petsUserController.index);
petsRouter.put('/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().allow(''),
            species: Joi.string().required(),
            age: Joi.string().required(),
            description: Joi.string().required(),
            gender: Joi.string().required(),
            is_adopt: Joi.boolean().required(),
            location_lat: Joi.string().required(),
            location_lon: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
        }
    }),
    ensureAuthenticated,
    petsController.update);
petsRouter.delete('/:id', ensureAuthenticated, petsController.delete);

export default petsRouter;