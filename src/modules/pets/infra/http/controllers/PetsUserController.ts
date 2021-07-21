import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from 'class-transformer';

import FindPetsByUserService from "../../../services/find/FindPetsByUserService";

export default class PetsUserController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const findPetsByUser = container.resolve(FindPetsByUserService);

        const pets = await findPetsByUser.execute(id);

        return response.json(classToClass(pets));
    }
}