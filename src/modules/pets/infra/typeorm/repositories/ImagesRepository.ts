import ICreateImageDTO from "../../../../pets/dtos/ICreateImageDTO";
import IImagesRepository from "../../../../pets/repositories/IImagesRepository";
import { getRepository, Repository } from "typeorm";
import Image from "../entities/Image";


class ImagesRepository implements IImagesRepository {
    private ormRepository: Repository<Image>;

    constructor() {
        this.ormRepository = getRepository(Image);
    }

    public async create({
        image, pet_id
    }: ICreateImageDTO): Promise<Image> {
        const imagePet = this.ormRepository.create({
            image, pet_id
        });

        await this.ormRepository.save(imagePet);

        return imagePet;
    }

    public async findByPetId(pet_id: string): Promise<Image[]> {
        const images = await this.ormRepository.find({ where: { pet_id: pet_id } });

        return images;
    }

    public async findById(id: string): Promise<Image> {
        const image = await this.ormRepository.findOne(id);

        return image;
    }

    public async save(image: Image): Promise<Image> {
        return await this.ormRepository.save(image);
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }
}

export default ImagesRepository;