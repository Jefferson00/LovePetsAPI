
import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassword', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPassword = new ResetPasswordService(
            fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider
        );
    });
    it('should be able to reset password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');


        await resetPassword.execute({
            token,
            password: '1234'
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('1234');
        expect(updatedUser?.password).toBe('1234');
    });

    it('should not be able to reset password with non-existing token', async () => {
        await expect(
            resetPassword.execute({
                token: 'non-existing-token',
                password: '12345',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password with non-existing user', async () => {
        const { token } = await fakeUserTokensRepository.generate('non-existing-user');

        await expect(
            resetPassword.execute({
                token,
                password: '12345',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password if passed more than 2 hours', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        })

        await expect(
            resetPassword.execute({
                token,
                password: '1234'
            }),
        ).rejects.toBeInstanceOf(AppError);

    });

});