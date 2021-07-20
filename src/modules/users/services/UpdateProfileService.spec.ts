import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jeffin',
      email: 'jeffin@jeffin.com',
      password: '123456',
      phone: '61 0000000',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jeffin 2',
      email: 'jeffin2@jeffin.com',
      phone: '61 0000000',
    });

    expect(updatedUser.name).toBe('Jeffin 2');
    expect(updatedUser.email).toBe('jeffin2@jeffin.com');
  });

  it('should be able to update the profile with avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jeffin',
      email: 'jeffin@jeffin.com',
      password: '123456',
      phone: '61 0000000',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jeffin',
      email: 'jeffin@jeffin.com',
      phone: '61 0000000',
      avatar: 'avatar.jpg'
    });

    expect(updatedUser.avatar).toBe('avatar.jpg');
  });

  it('should NOT be able to update email to an already using email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jeffin',
      email: 'jeffin@jeffin.com',
      password: '123456',
      phone: '61 0000000',
    });

    await fakeUsersRepository.create({
      name: 'Jeffin3',
      email: 'jeffin3@jeffin.com',
      password: '123456',
      phone: '61 00000001',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jeffinn',
        email: 'jeffin3@jeffin.com',
        phone: '61 00000001',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jeffin',
      email: 'jeffin@jeffin.com',
      password: '123456',
      phone: '61 0000000',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jeffin',
      email: 'jeffin@jeffin.com',
      phone: '61 0000000',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should NOT be able to update the password with wrong current password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jeffin',
      email: 'jeffin@jeffin.com',
      password: '123456',
      phone: '61 0000000',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jeffin',
        email: 'jeffin@jeffin.com',
        password: '123456',
        phone: '61 0000000',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update the password without current password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jeffin',
      email: 'jeffin@jeffin.com',
      password: '123456',
      phone: '61 0000000',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jeffin',
        email: 'jeffin@jeffin.com',
        password: '123123',
        phone: '61 0000000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update the profile of a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: 'Test',
        email: 'test@example.com',
        phone: '61 0000000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
