import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IFavUserPetsRepository from "../../repositories/IFavUserPetsRepository";

@injectable()
class DeleteFavUserPetsService {
    constructor(
        @inject('FavUserPetsRepository')
        private favUserPetsRepository: IFavUserPetsRepository,
    ) { }

    public async execute(id: string): Promise<void> {
        const favExist = await this.favUserPetsRepository.findById(id);

        if (!favExist) {
            throw new AppError('Fav not found');
        }

        await this.favUserPetsRepository.delete(id);
    }
}

export default DeleteFavUserPetsService;