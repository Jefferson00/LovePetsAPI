import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Pet from "../../infra/typeorm/entities/Pet";
import IPetsRepository from "../../repositories/IPetsRepository";

interface RequestDTO {
    name: string;
    id: string;
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
class UpdatePetService {
    constructor(
        @inject('PetsRepository')
        private petsRepository: IPetsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute({
        id,
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

        const pet = await this.petsRepository.findById(id);

        if (!pet) {
            throw new AppError('Pet not found.');
        }

        if (user_id !== pet.user_id) {
            throw new AppError('Operation not authorized!');
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

        pet.name = name;
        pet.species = species;
        pet.age = age;
        pet.gender = gender;
        pet.is_adopt = is_adopt;
        pet.city = city;
        pet.state = state;
        pet.location_lat = location_lat;
        pet.location_lon = location_lon;
        pet.description = description;

        return this.petsRepository.save(pet);
    }
}

export default UpdatePetService;