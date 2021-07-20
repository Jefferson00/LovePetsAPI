import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/errors/AppError";
import FakeImagesRepository from "../../repositories/fakes/FakeImagesRepository";
import DeleteImageService from "./DeleteImageService";


let fakeImagesRepository: FakeImagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let deleteImagePet: DeleteImageService;

describe('DeleteImagePet', () => {
    beforeEach(() => {
        fakeImagesRepository = new FakeImagesRepository();
        fakeStorageProvider = new FakeStorageProvider();

        deleteImagePet = new DeleteImageService(
            fakeImagesRepository, fakeStorageProvider,
        );
    });

    it('should be able to delete an image', async () => {
        const deleteImage = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const image = await fakeImagesRepository.create({
            image: 'teste.jpg',
            pet_id: 'pet-id'
        });

        const imageDeleted = await deleteImagePet.execute({
            id: image.id,
            pet_id: 'pet-id'
        })

        expect(deleteImage).toHaveBeenCalledWith('teste.jpg');
    });

    it('should NOT be able to delete an Image with wrong pet_id', async () => {
        const image = await fakeImagesRepository.create({
            image: 'teste.jpg',
            pet_id: 'pet-id'
        });
        await expect(
            deleteImagePet.execute({
                id: image.id,
                pet_id: 'other-pet-id'
            })).rejects.toBeInstanceOf(AppError);
    });
});