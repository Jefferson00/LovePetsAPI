import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IImagesRepository from "../../repositories/IImagesRepository";
import IPetsRepository from "../../repositories/IPetsRepository";

interface RequestDTO {
    id: string;
    user_id: string;
}

@injectable()
class DeletePetService {
    constructor(
        @inject('PetsRepository')
        private petsRepository: IPetsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('ImagesRepository')
        private imagesRepository: IImagesRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) { }

    public async execute({
        user_id,
        id
    }: RequestDTO): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const pet = await this.petsRepository.findById(id);

        if (pet.user_id !== user_id) {
            throw new AppError('User not found.');
        }

        const images = await this.imagesRepository.findByPetId(pet.id);

        images.map(async (deleteImage) => {
            await this.storageProvider.deleteFile(deleteImage.image);
        });

        await this.petsRepository.delete(id);
    }
}

export default DeletePetService;