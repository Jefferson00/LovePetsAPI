import { uuid } from "uuidv4";

import ICreateImageDTO from "../../../pets/dtos/ICreateImageDTO";
import Image from "../../../pets/infra/typeorm/entities/Image";
import IImagesRepository from "../IImagesRepository";



class FakeImagesRepository implements IImagesRepository {
    private images: Image[] = [];

    public async create({
        image, pet_id
    }: ICreateImageDTO): Promise<Image> {
        const imagePet = new Image();

        Object.assign(imagePet, {
            id: uuid(), image, pet_id
        });

        this.images.push(imagePet);

        return imagePet;
    }

    public async findByPetId(pet_id: string): Promise<Image[]> {
        let imageFind: Image[];

        imageFind = this.images.filter(image => image.pet_id === pet_id);

        return imageFind;
    }

    public async findById(id: string): Promise<Image | undefined> {
        const findImage = this.images.find(image => image.id === id);

        return findImage;
    }

    public async save(image: Image): Promise<Image> {
        const findIndex = this.images.findIndex(findImage => findImage.id === image.id);

        this.images[findIndex] = image;

        return image;
    }

    public async delete(id: string): Promise<void> {
        const findIndex = this.images.findIndex(findImage => findImage.id === id);

        this.images.splice(findIndex, 1);
    }
}

export default FakeImagesRepository;