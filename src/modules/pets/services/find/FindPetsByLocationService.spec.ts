
import FakeGeoProvider from '../../providers/GeoProvider/fakes/FakeGeoProvider';
import FakePetsRepository from "../../repositories/fakes/FakePetsRepository";
import FakeUsersRepository from "../../../users/repositories/fakes/FakeUsersRepository";
import FindPetsByLocationService from "./FindPetsByLocationService";
import CreatePetService from "../create/CreatePetService";


let fakePetsRepository: FakePetsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeGeoProvider: FakeGeoProvider;
let findPetsByLocation: FindPetsByLocationService;
let createPetsRepository: CreatePetService;

describe('FindLocation', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();
        fakeGeoProvider = new FakeGeoProvider();
        fakeUsersRepository = new FakeUsersRepository();

        createPetsRepository = new CreatePetService(
            fakePetsRepository, fakeUsersRepository,
        );

        findPetsByLocation = new FindPetsByLocationService(
            fakePetsRepository, fakeGeoProvider,
        );
    });

    it('should be able to find locations by distance', async () => {
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
            location_lat: '-15.785647',
            location_lon: '-48.141282',
            city: 'brasília',
            state: 'DF'
        });

        const pet2 = await fakePetsRepository.create({
            name: 'Bixano',
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: user.id,
            location_lat: '-15.805086',
            location_lon: '-48.121796',
            city: 'brasília',
            state: 'DF'
        });

        const pets = await findPetsByLocation.execute({
            location_lat: '-15.805086',
            location_lon: '-48.121796',
            distance: '50',
            gender: 'undefined',
            limit: 5,
            skip: 1,
            species: 'undefined',
        });

        expect(pets).toEqual([pet, pet2]);
    });
    it('should be able to find locations by distance without distance', async () => {
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
            location_lat: '-15.785647',
            location_lon: '-48.141282',
            city: 'brasília',
            state: 'DF'
        });

        const pet2 = await fakePetsRepository.create({
            name: 'Bixano',
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: user.id,
            location_lat: '-15.805086',
            location_lon: '-48.121796',
            city: 'brasília',
            state: 'DF'
        });

        const pets = await findPetsByLocation.execute({
            location_lat: '-15.805086',
            location_lon: '-48.121796',
            distance: null,
            gender: 'undefined',
            limit: 5,
            skip: 1,
            species: 'undefined',
        });

        expect(pets).toEqual([pet, pet2]);
    });
    it('should be able to find locations by distance with specie and gender filter', async () => {
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
            location_lat: '-15.785647',
            location_lon: '-48.141282',
            city: 'brasília',
            state: 'DF'
        });

        const pet2 = await fakePetsRepository.create({
            name: 'Bixano',
            species: 'dog',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: user.id,
            location_lat: '-15.805086',
            location_lon: '-48.121796',
            city: 'brasília',
            state: 'DF'
        });

        const pets = await findPetsByLocation.execute({
            location_lat: '-15.805086',
            location_lon: '-48.121796',
            distance: null,
            gender: 'male',
            limit: 5,
            skip: 1,
            species: 'dog',
        });

        expect(pets).toEqual([pet2]);
    });
});