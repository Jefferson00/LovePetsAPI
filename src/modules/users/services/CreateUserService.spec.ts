
import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository, fakeHashProvider,
        );

        const user = await createUser.execute({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });

        expect(user).toHaveProperty('id');
    })

    it('should not be able to create a new user with the same e-mail', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeUsersRepository, fakeHashProvider,
        );

        await createUser.execute({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });

        await expect(createUser.execute({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 00000001',
        })).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to create a new user with the same phone', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeUsersRepository, fakeHashProvider,
        );

        await createUser.execute({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });

        await expect(createUser.execute({
            name: 'Jeffin',
            email: 'jeffin1@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        })).rejects.toBeInstanceOf(AppError);
    })
})