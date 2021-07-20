
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { inject, injectable } from "tsyringe";
import Image from "../../infra/typeorm/entities/Image";
import IImagesRepository from "../../repositories/IImagesRepository";

interface RequestDTO {
    image: string;
    pet_id: string;
}

@injectable()
class CreateImageService {
    constructor(
        @inject('ImagesRepository')
        private imagesRepository: IImagesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) { }

    public async execute({
        image, pet_id
    }: RequestDTO): Promise<Image> {
        const filename = await this.storageProvider.saveFile(image);

        const imagePet = await this.imagesRepository.create({
            image: filename, pet_id
        });

        return imagePet;
    }
}

export default CreateImageService;