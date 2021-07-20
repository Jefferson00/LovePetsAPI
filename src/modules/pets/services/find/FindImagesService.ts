import { inject, injectable } from "tsyringe";
import Image from "../../infra/typeorm/entities/Image";
import IImagesRepository from "../../repositories/IImagesRepository";


@injectable()
class FindImagesService {
  constructor(
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,
  ) { }

  public async execute(pet_id: string): Promise<Image[]> {
    const images = await this.imagesRepository.findByPetId(pet_id);

    return images;
  }
}

export default FindImagesService;