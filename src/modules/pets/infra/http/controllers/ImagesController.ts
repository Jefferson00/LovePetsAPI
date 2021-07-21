import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import CreateImageService from "../../../services/create/CreateImageService";
import DeleteImageService from "../../../services/delete/DeleteImageService";
import FindImagesService from "../../../services/find/FindImagesService";
import UpdateImageService from "../../../services/update/UpdateImageService";

export default class ImagesController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { pet_id } = request.params;

        const findImage = container.resolve(FindImagesService);

        const images = await findImage.execute(String(pet_id));

        return response.json(classToClass(images));
    }
    public async create(request: Request, response: Response): Promise<Response> {
        const {
            pet_id
        } = request.body;

        const createImage = container.resolve(CreateImageService);

        const imagePet = await createImage.execute({
            image: request.file.filename,
            pet_id
        });

        return response.json(classToClass(imagePet));
    }
    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { pet_id } = request.body;

        const updateImage = container.resolve(UpdateImageService);

        const imagePet = await updateImage.execute({
            id,
            pet_id,
            image: request.file.filename,
        });

        return response.json(classToClass(imagePet));
    }
    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { pet_id } = request.body;

        const deleteImage = container.resolve(DeleteImageService);

        await deleteImage.execute({ id, pet_id });

        return response.send();
    }
}