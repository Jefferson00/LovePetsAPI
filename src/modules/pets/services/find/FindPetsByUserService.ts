import { inject, injectable } from "tsyringe";

import Pet from "../../infra/typeorm/entities/Pet";
import IPetsRepository from "../../repositories/IPetsRepository";

@injectable()
class FindPetsByUserService {
    constructor(
        @inject('PetsRepository')
        private petsRepository: IPetsRepository,
    ) { }

    public async execute(user_id: string): Promise<Pet[]> {
        const petsByUser = await this.petsRepository.findByUser(user_id);

        return petsByUser;
    }
}

export default FindPetsByUserService;