import IFavUserPetsRepository from "../../../../pets/repositories/IFavUserPetsRepository";
import { getRepository, Repository } from "typeorm";
import FavUserPets from "../entities/FavUserPets";


class FavUserPetsRepository implements IFavUserPetsRepository {
    private ormRepository: Repository<FavUserPets>;

    constructor() {
        this.ormRepository = getRepository(FavUserPets);
    }

    public async create(user_id: string, pet_id: string): Promise<FavUserPets> {
        const fav = this.ormRepository.create({
            user_id,
            pet_id,
        });

        await this.ormRepository.save(fav);

        return fav;
    }

    public async findByUser(user_id: string): Promise<FavUserPets[]> {
        let favs: FavUserPets[];

        favs = await this.ormRepository.find({
            relations: ['user', 'pet', 'pet.user'],
            where: { user_id },
            order: { created_at: 'DESC' }
        });

        return favs;
    }

    public async findByUserAndPet(user_id: string, pet_id: string): Promise<FavUserPets> {
        let fav: FavUserPets;

        fav = await this.ormRepository.findOne({
            relations: ['user', 'pet', 'pet.user'],
            where: { user_id, pet_id },
        });

        return fav;
    }

    public async findById(id: string): Promise<FavUserPets | undefined> {
        const fav = await this.ormRepository.findOne(id);

        return fav;
    }


    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }
}

export default FavUserPetsRepository;