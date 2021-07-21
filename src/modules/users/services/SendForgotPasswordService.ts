import { inject, injectable } from 'tsyringe';

import path from 'path';

import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvaider from '../../../shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';


interface Request {
    email: string;
}

@injectable()
class SendForgotPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvaider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ) { }
    public async execute({ email }: Request): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        const { token } = await this.userTokensRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs',);

        await this.mailProvider.sendMail({
            to: {
                email: user.email,
                name: user.name,
            },
            subject: '[Love Pets] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                }
            }
        });
    }
}

export default SendForgotPasswordService;