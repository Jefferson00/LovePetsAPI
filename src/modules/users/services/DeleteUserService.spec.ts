
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import DeleteUserService from './DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let deleteUser: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    deleteUser = new DeleteUserService(
      fakeUsersRepository, fakeStorageProvider,
    );
  });

  it('should be able to delete a user', async () => {
    //const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user2 = await fakeUsersRepository.create({
      name: 'Jeffin',
      email: 'jeffin2@jeffin.com',
      password: '123456',
      phone: '61 00000002',
    });

    await deleteUser.execute(user2.id);

    const users = await fakeUsersRepository.findById(user2.id);

    expect(users).toBe(undefined);
    //expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
  })

  it('should not be able to delete a user with invalid id', async () => {
    await expect(deleteUser.execute('invalid-id')).rejects.toBeInstanceOf(AppError);
  });

})