import ICreatePetDTO from "../../../pets/dtos/ICreatePetDTO";
import IFindByDistanceDTO from "../../../pets/dtos/IFindByDistanceDTO";
import Pet from "../../../pets/infra/typeorm/entities/Pet";
import { uuid } from "uuidv4";
import IPetsRepository from "../IPetsRepository";

class FakePetsRepository implements IPetsRepository {
    private pets: Pet[] = [];

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
        state,
    }: ICreatePetDTO): Promise<Pet> {
        const pet = new Pet();

        Object.assign(pet, {
            id: uuid(),
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

        this.pets.push(pet);

        return pet;
    }

    public async findByDistance({
        location_lon, location_lat, distance
    }: IFindByDistanceDTO): Promise<Pet[] | undefined> {

        let { pets } = this;

        return pets;
    };

    public async findByUser(user_id: string): Promise<Pet[] | undefined> {
        let pets = this.pets.filter(pet => pet.user_id === user_id);

        return pets;
    }

    public async findById(id: string): Promise<Pet | undefined> {
        let pet = this.pets.find(pet => pet.id === id);

        return pet;
    }

    public async save(pet: Pet): Promise<Pet> {
        const findIndex = this.pets.findIndex(findPet => findPet.id === pet.id);

        this.pets[findIndex] = pet;

        return pet;
    }

    public async delete(id: string): Promise<void> {
        const findIndex = this.pets.findIndex(findPet => findPet.id === id);

        this.pets.splice(findIndex, 1);
    }
}

export default FakePetsRepository;