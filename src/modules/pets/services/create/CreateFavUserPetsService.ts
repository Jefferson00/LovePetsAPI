import IUsersRepository from "../../../users/repositories/IUsersRepository";
import AppError from "../../../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import FavUserPets from "../../infra/typeorm/entities/FavUserPets";
import IFavUserPetsRepository from "../../repositories/IFavUserPetsRepository";
import IPetsRepository from "../../repositories/IPetsRepository";


@injectable()
class CreateFavUserPetsService {
    constructor(
        @inject('FavUserPetsRepository')
        private favUserPetsRepository: IFavUserPetsRepository,

        @inject('PetsRepository')
        private petsRepository: IPetsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute(user_id: string, pet_id: string): Promise<FavUserPets> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const pet = await this.petsRepository.findById(pet_id);

        if (!pet) {
            throw new AppError('Pet not found.');
        }

        const favExist = await this.favUserPetsRepository.findByUserAndPet(user_id, pet_id);

        if (favExist) {
            throw new AppError('Fav already exists');
        }

        const fav = await this.favUserPetsRepository.create(user_id, pet_id);

        return fav;
    }
}

export default CreateFavUserPetsService;