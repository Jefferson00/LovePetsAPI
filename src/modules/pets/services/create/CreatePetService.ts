import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Pet from "../../infra/typeorm/entities/Pet";
import IPetsRepository from "../../repositories/IPetsRepository";

interface RequestDTO {
    name: string;
    user_id: string;
    species: string;
    is_adopt: boolean;
    age: string;
    gender: string;
    description: string;
    location_lat: string;
    location_lon: string;
    city: string;
    state: string;
}

@injectable()
class CreatePetService {
    constructor(
        @inject('PetsRepository')
        private petsRepository: IPetsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute({
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
    }: RequestDTO): Promise<Pet> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        if (is_adopt) {
            throw new AppError('The pet must be available for adoption.');
        }

        if (!name || name === '') {
            name = 'pet'
            if (species === 'cat') {
                name = 'bixano'
            }
            if (species === 'dog') {
                name = 'doguinho'
            }
        }


        const pet = await this.petsRepository.create({
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

        return pet;
    }
}

export default CreatePetService;