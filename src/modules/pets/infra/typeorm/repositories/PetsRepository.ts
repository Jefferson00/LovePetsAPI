import ICreatePetDTO from "../../../../pets/dtos/ICreatePetDTO";
import IFindByDistanceDTO from "../../../../pets/dtos/IFindByDistanceDTO";
import Pet from "../../../../pets/infra/typeorm/entities/Pet";
import IPetsRepository from "../../../../pets/repositories/IPetsRepository";
import { getRepository, Repository } from "typeorm";


class PetsRepository implements IPetsRepository {
    private ormRepository: Repository<Pet>;

    constructor() {
        this.ormRepository = getRepository(Pet);
    }

    public async create({
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
        state
    }: ICreatePetDTO): Promise<Pet> {
        const pet = this.ormRepository.create({
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

        await this.ormRepository.save(pet);

        return pet;
    }

    public async findByDistance({
        location_lat,
        location_lon,
        distance,
        species,
        gender,
        limit,
        skip
    }: IFindByDistanceDTO): Promise<Pet[] | undefined> {

        let pets: Pet[];

        const result = await this.ormRepository.find({
            relations: ['user'],
            order: { created_at: 'DESC' }
        });

        pets = result;

        return pets;
    }

    public async findByUser(user_id: string): Promise<Pet[] | undefined> {
        let pets: Pet[];

        pets = await this.ormRepository.find({
            relations: ['user'],
            where: { user_id },
            order: { created_at: 'DESC' }
        });

        return pets;
    }

    public async findById(id: string): Promise<Pet | undefined> {
        const pet = await this.ormRepository.findOne(id, {
            relations: ['user'],
        });

        return pet;
    }

    public async save(pet: Pet): Promise<Pet> {
        return await this.ormRepository.save(pet);
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }
}

export default PetsRepository;