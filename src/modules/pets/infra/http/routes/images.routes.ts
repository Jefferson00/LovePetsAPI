import uploadConfig from '../../../../../config/upload';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import multer from 'multer';
import ImagesController from '../controllers/ImagesController';

const imagesRouter = Router();

const upload = multer(uploadConfig.multer);

const imagesController = new ImagesController();

imagesRouter.patch('/', upload.single('image'), ensureAuthenticated, imagesController.create);
imagesRouter.get('/:pet_id', imagesController.index);
imagesRouter.patch('/:id', upload.single('image'), ensureAuthenticated, imagesController.update);
imagesRouter.delete('/:id', ensureAuthenticated, imagesController.delete);

export default imagesRouter;