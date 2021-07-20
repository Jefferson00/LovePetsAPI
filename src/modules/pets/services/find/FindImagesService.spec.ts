import FakeImagesRepository from "../../repositories/fakes/FakeImagesRepository";
import FindImagesService from "./FindImagesService";


let fakeImagesRepository: FakeImagesRepository;
let findImages: FindImagesService;

describe('FindImages', () => {
    beforeEach(() => {
        fakeImagesRepository = new FakeImagesRepository();

        findImages = new FindImagesService(
            fakeImagesRepository,
        );
    });

    it('should be able to find images of a pet by pet id', async () => {
        const image1 = await fakeImagesRepository.create({
            image: 'image1.jpg',
            pet_id: 'pet_id_1',
        });
        const image2 = await fakeImagesRepository.create({
            image: 'image2.jpg',
            pet_id: 'pet_id_1',
        });
        const image3 = await fakeImagesRepository.create({
            image: 'image3.jpg',
            pet_id: 'pet_id_1',
        });
        const image4 = await fakeImagesRepository.create({
            image: 'image4.jpg',
            pet_id: 'pet_id_2',
        });

        const images = await findImages.execute('pet_id_1');

        expect(images).toEqual([image1, image2, image3]);
    });



});