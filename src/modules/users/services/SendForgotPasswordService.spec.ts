
import FakeMailProvider from '../../../shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '../../../shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordService from './SendForgotPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPassword: SendForgotPasswordService;

describe('SendForgotPassword', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPassword = new SendForgotPasswordService(
            fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository
        );
    });
    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });

        await sendForgotPassword.execute({
            email: 'jeffin@jeffin.com',
        });

        expect(sendMail).toHaveBeenCalled();
    })

    it('should not be able to recover a non-existing user password', async () => {
        await expect(sendForgotPassword.execute({
            email: 'jeffin@jeffin.com',
        })).rejects.toBeInstanceOf(AppError);
    })

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });

        await sendForgotPassword.execute({
            email: 'jeffin@jeffin.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    })

})