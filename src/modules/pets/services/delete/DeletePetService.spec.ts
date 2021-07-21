import FakeUsersRepository from "../../../users/repositories/fakes/FakeUsersRepository";
import FakeStorageProvider from "../../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "../../../../shared/errors/AppError";
import FakeImagesRepository from "../../repositories/fakes/FakeImagesRepository";
import FakePetsRepository from "../../repositories/fakes/FakePetsRepository";
import DeletePetService from "./DeletePetService";


let fakePetsRepository: FakePetsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeImagesRepository: FakeImagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let deletePet: DeletePetService;

describe('DeletePet', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeImagesRepository = new FakeImagesRepository();
        fakeStorageProvider = new FakeStorageProvider();

        deletePet = new DeletePetService(
            fakePetsRepository,
            fakeUsersRepository,
            fakeImagesRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to delete a pet', async () => {


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

        const pet2 = await fakePetsRepository.create({
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

        await deletePet.execute({
            id: pet2.id,
            user_id: user.id
        })

        const pets = await fakePetsRepository.findByUser(user.id);

        expect(pets).toEqual([pet]);

    });

    it('should NOT be able to delete an Pet with non-existing user', async () => {
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
        await expect(
            deletePet.execute({
                id: pet.id,
                user_id: 'non-existing-user'
            })).rejects.toBeInstanceOf(AppError);
    });

    it('should NOT be able to delete an Pet with non-valid user', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });
        const user2 = await fakeUsersRepository.create({
            name: 'Jeffin2',
            email: 'jeffin2@jeffin.com',
            password: '123456',
            phone: '61 00000002',
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
        await expect(
            deletePet.execute({
                id: pet.id,
                user_id: user2.id
            })).rejects.toBeInstanceOf(AppError);
    });
});