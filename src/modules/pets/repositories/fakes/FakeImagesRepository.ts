import ICreateImageDTO from "@modules/pets/dtos/ICreateImageDTO";
import Image from "@modules/pets/infra/typeorm/entities/Image";
import { uuid } from "uuidv4";
import IImagesRepository from "../IImagesRepository";



class FakeImagesRepository implements IImagesRepository{
    private images: Image[] = []; 

    public async create({
        image, pet_id
    } : ICreateImageDTO): Promise<Image> {
        const imagePet = new Image();

        Object.assign(imagePet, {
            id: uuid(), image, pet_id  
        });

        this.images.push(imagePet);

        return imagePet;
    }
}

export default FakeImagesRepository;