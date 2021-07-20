import { inject, injectable } from "tsyringe";
import FavUserPets from "../../infra/typeorm/entities/FavUserPets";

import IFavUserPetsRepository from "../../repositories/IFavUserPetsRepository";

@injectable()
class FindFavUserPetsService {
    constructor(
        @inject('FavUserPetsRepository')
        private favUserPetsRepository: IFavUserPetsRepository,

    ) { }

    public async execute(user_id: string): Promise<FavUserPets[]> {

        const favs = await this.favUserPetsRepository.findByUser(user_id);


        return favs;
    }
}

export default FindFavUserPetsService;