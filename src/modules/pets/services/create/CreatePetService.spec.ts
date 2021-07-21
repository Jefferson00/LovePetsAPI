import FakeUsersRepository from "../../../users/repositories/fakes/FakeUsersRepository";
import AppError from "../../../../shared/errors/AppError";
import FakePetsRepository from "../../repositories/fakes/FakePetsRepository";
import CreatePetService from "./CreatePetService";


let fakePetsRepository: FakePetsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createPet: CreatePetService;

describe('CreatePet', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();
        fakeUsersRepository = new FakeUsersRepository();

        createPet = new CreatePetService(
            fakePetsRepository, fakeUsersRepository
        );
    });

    it('should be able to create a new pet', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });

        const pet = await createPet.execute({
            name: 'Bixano',
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: user.id,
            location_lat: 'location-id',
            location_lon: '',
            city: '',
            state: ''
        });

        expect(pet).toHaveProperty('id');
        expect(pet.user_id).toBe(user.id);
    });

    it('should be able to create a new pet without name', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });

        const pet = await createPet.execute({
            name: null,
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: user.id,
            location_lat: 'location-id',
            location_lon: '',
            city: '',
            state: ''
        });

        expect(pet).toHaveProperty('id');
        expect(pet.name).toBe('bixano');
        expect(pet.user_id).toBe(user.id);

        const pet2 = await createPet.execute({
            name: null,
            species: 'dog',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: user.id,
            location_lat: 'location-id',
            location_lon: '',
            city: '',
            state: ''
        });

        expect(pet2).toHaveProperty('id');
        expect(pet2.name).toBe('doguinho');
        expect(pet2.user_id).toBe(user.id);

        const pet3 = await createPet.execute({
            name: null,
            species: 'fish',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: user.id,
            location_lat: 'location-id',
            location_lon: '',
            city: '',
            state: ''
        });

        expect(pet3).toHaveProperty('id');
        expect(pet3.name).toBe('pet');
        expect(pet3.user_id).toBe(user.id);
    });

    it('should Not be able to create a new pet with is_adopt true', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });

        await expect(
            createPet.execute({
                name: 'Bixano',
                species: 'cat',
                age: '1 ano',
                description: 'description',
                gender: 'male',
                is_adopt: true,
                user_id: user.id,
                location_lat: 'location-id',
                location_lon: '',
                city: '',
                state: ''
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should Not be able to create a new pet without a valid user_id', async () => {
        await expect(
            createPet.execute({
                name: 'Bixano',
                species: 'cat',
                age: '1 ano',
                description: 'description',
                gender: 'male',
                is_adopt: false,
                user_id: 'non-existing-id',
                location_lat: 'location-id',
                location_lon: '',
                city: '',
                state: ''
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});