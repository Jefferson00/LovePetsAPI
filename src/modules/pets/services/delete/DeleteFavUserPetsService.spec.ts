import AppError from "../../../../shared/errors/AppError";
import FakeFavUserPetsRepository from "../../repositories/fakes/FakeFavUserPetsRepository";
import DeleteFavUserPetsService from "./DeleteFavUserPetsService";


let fakeFavUserPetsRepository: FakeFavUserPetsRepository;
let deleteFav: DeleteFavUserPetsService;

describe('DeletePet', () => {
    beforeEach(() => {
        fakeFavUserPetsRepository = new FakeFavUserPetsRepository();

        deleteFav = new DeleteFavUserPetsService(
            fakeFavUserPetsRepository,
        );
    });

    it('should be able to delete a fav', async () => {
        const fav = await fakeFavUserPetsRepository.create(
            'user_id',
            'pet_id',
        );
        const fav2 = await fakeFavUserPetsRepository.create(
            'user_id',
            'pet_id_2',
        );

        await deleteFav.execute(fav.id);

        const favs = await fakeFavUserPetsRepository.findByUser('user_id');

        expect(favs).toEqual([fav2]);
    });


    it('should Not be able to delete a non-exist fav', async () => {
        await expect(
            deleteFav.execute('non-existing-id')
        ).rejects.toBeInstanceOf(AppError);
    });
});