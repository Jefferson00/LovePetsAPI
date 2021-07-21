import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from 'class-transformer';

import CreatePetService from "../../../services/create/CreatePetService";
import FindPetsByLocationService from "../../../services/find/FindPetsByLocationService";
import UpdatePetService from "../../../services/update/UpdatePetService";
import DeletePetService from "../../../services/delete/DeletePetService";
import FindPetsByIdService from "../../../services/find/FindPetsByIdService";

export default class PetsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { location_lat, location_lon, distance, species, gender, limit, skip } = request.query;

        const findPetsByLocation = container.resolve(FindPetsByLocationService);

        const pets = await findPetsByLocation.execute({
            location_lat: String(location_lat),
            location_lon: String(location_lon),
            distance: String(distance),
            species: String(species),
            gender: String(gender),
            limit: Number(limit),
            skip: Number(skip),
        });

        return response.json(classToClass(pets));
    }

    public async find(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const findPet = container.resolve(FindPetsByIdService);

        const pet = await findPet.execute(id);

        return response.json(classToClass(pet));
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const {
            name,
            species,
            age,
            is_adopt,
            gender,
            description,
            location_lat,
            location_lon,
            city,
            state,
        } = request.body;

        const createPet = container.resolve(CreatePetService);

        const pet = await createPet.execute({
            user_id,
            name,
            species,
            age,
            is_adopt,
            gender,
            description,
            location_lat,
            location_lon,
            city,
            state,
        });

        return response.json(pet);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { id } = request.params;
        const {
            name,
            species,
            age,
            is_adopt,
            gender,
            description,
            location_lat,
            location_lon,
            city,
            state
        } = request.body;

        const updatePet = container.resolve(UpdatePetService);

        const pet = await updatePet.execute({
            user_id,
            id: String(id),
            name,
            species,
            age,
            is_adopt,
            gender,
            description,
            location_lat,
            location_lon,
            city,
            state
        });

        return response.json(pet);

    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const user_id = request.user.id;

        const deletePet = container.resolve(DeletePetService);

        await deletePet.execute({ id, user_id });

        return response.send();
    }
}