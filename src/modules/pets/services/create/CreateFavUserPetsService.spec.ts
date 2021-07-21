import FakeUsersRepository from "../../../users/repositories/fakes/FakeUsersRepository";
import AppError from "../../../../shared/errors/AppError";
import FakeFavUserPetsRepository from "../../repositories/fakes/FakeFavUserPetsRepository";
import FakePetsRepository from "../../repositories/fakes/FakePetsRepository";
import CreateFavUserPetsService from "./CreateFavUserPetsService";


let fakePetsRepository: FakePetsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeFavUserPetsRepository: FakeFavUserPetsRepository;
let createFavUserPet: CreateFavUserPetsService;

describe('CreateFavUserPets', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeFavUserPetsRepository = new FakeFavUserPetsRepository();

        createFavUserPet = new CreateFavUserPetsService(
            fakeFavUserPetsRepository,
            fakePetsRepository,
            fakeUsersRepository,
        );
    });

    it('should be able to create a new fav', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });

        const pet = await fakePetsRepository.create({
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

        const fav = await createFavUserPet.execute(
            user.id,
            pet.id,
        )

        expect(fav).toHaveProperty('id');
        expect(fav.user_id).toBe(user.id);
        expect(fav.pet_id).toBe(pet.id);
    });

    it('should Not be able to create a new fav without a valid user_id', async () => {
        const pet = await fakePetsRepository.create({
            name: 'Bixano',
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: 'user_id',
            location_lat: 'location-id',
            location_lon: '',
            city: '',
            state: ''
        });
        await expect(
            createFavUserPet.execute(
                'user.id',
                pet.id,
            )
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should Not be able to create a new fav without a valid pet_id', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });
        await expect(
            createFavUserPet.execute(
                user.id,
                'pet.id',
            )
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should Not be able to create a new fav already exists', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });
        const pet = await fakePetsRepository.create({
            name: 'Bixano',
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: 'user_id',
            location_lat: 'location-id',
            location_lon: '',
            city: '',
            state: ''
        });
        await createFavUserPet.execute(
            user.id,
            pet.id,
        );
        await expect(
            createFavUserPet.execute(
                user.id,
                pet.id,
            )
        ).rejects.toBeInstanceOf(AppError);
    });
});