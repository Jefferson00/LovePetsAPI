import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }
  public async execute(id: string): Promise<void> {
    const checkUserExists = await this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new AppError('User not found.');
    }

    if (checkUserExists.avatar) {
      await this.storageProvider.deleteFile(checkUserExists.avatar);
    }

    await this.usersRepository.delete(id);
  }
}

export default DeleteUserService;