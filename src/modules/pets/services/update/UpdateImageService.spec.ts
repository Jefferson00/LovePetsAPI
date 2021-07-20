
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/errors/AppError";
import FakeImagesRepository from "../../repositories/fakes/FakeImagesRepository";
import UpdateImageService from "./UpdateImageService";


let fakeImagesRepository: FakeImagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateImagePet: UpdateImageService;

describe('UpdateImagePet', () => {
    beforeEach(() => {
        fakeImagesRepository = new FakeImagesRepository();
        fakeStorageProvider = new FakeStorageProvider();

        updateImagePet = new UpdateImageService(
            fakeImagesRepository, fakeStorageProvider,
        );
    });

    it('should be able to update an image', async () => {
        const createImage = jest.spyOn(fakeStorageProvider, 'saveFile');

        const image = await fakeImagesRepository.create({
            image: 'teste.jpg',
            pet_id: 'pet-id'
        });

        const imageUpdated = await updateImagePet.execute({
            id: image.id,
            pet_id: 'pet-id',
            image: 'teste2.jpg',
        })

        expect(createImage).toHaveBeenCalledWith('teste2.jpg');
        expect(imageUpdated.image).toBe('teste2.jpg');
    });

    it('should Not be able to update a image without a valid pet_id', async () => {
        const image = await fakeImagesRepository.create({
            image: 'teste.jpg',
            pet_id: 'pet-id'
        });
        await expect(
            updateImagePet.execute({
                id: image.id,
                image: 'update-teste.jpg',
                pet_id: 'non-existing-pet-id'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});