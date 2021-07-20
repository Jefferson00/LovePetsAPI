import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IImagesRepository from "../../repositories/IImagesRepository";

interface RequestDTO {
    id: string;
    pet_id: string;
}

@injectable()
class DeleteImageService {
    constructor(
        @inject('ImagesRepository')
        private imagesRepository: IImagesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) { }

    public async execute({ id, pet_id }: RequestDTO): Promise<void> {
        const findImage = await this.imagesRepository.findById(id);

        if (pet_id !== findImage.pet_id) {
            throw new AppError('Operation not authorized!');
        }

        await this.storageProvider.deleteFile(findImage.image);

        await this.imagesRepository.delete(id);
    }
}

export default DeleteImageService;