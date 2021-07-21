import { inject, injectable } from 'tsyringe';

import User from '../../users/infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
    name: string;
    email: string;
    password: string;
    phone: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }
    public async execute({ name, email, password, phone }: Request): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmailOrPhone(email, phone);

        if (checkUserExists) {
            throw new AppError('Email address or Phone already used');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        return user;
    }
}

export default CreateUserService;