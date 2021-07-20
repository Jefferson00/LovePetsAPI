
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import FakeImagesRepository from "../../repositories/fakes/FakeImagesRepository";
import CreateImageService from "./CreateImageService";


let fakeImagesRepository: FakeImagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createImagePet: CreateImageService;

describe('CreateImagePet', () => {
    beforeEach(() => {
        fakeImagesRepository = new FakeImagesRepository();
        fakeStorageProvider = new FakeStorageProvider();

        createImagePet = new CreateImageService(
            fakeImagesRepository, fakeStorageProvider
        );
    });

    it('should be able to create a new image', async () => {
        const createImage = jest.spyOn(fakeStorageProvider, 'saveFile');

        const image = await createImagePet.execute({
            image: 'teste.jpg',
            pet_id: 'pet-id'
        });

        expect(createImage).toHaveBeenCalledWith('teste.jpg');
        expect(image).toHaveProperty('id');
        expect(image.image).toBe('teste.jpg');
        expect(image.pet_id).toBe('pet-id');
    });
});