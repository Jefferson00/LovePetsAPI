import { inject, injectable } from 'tsyringe';

import path from 'path';

import IMailProvaider from '../../../shared/container/providers/MailProvider/models/IMailProvider';
import IPetsRepository from '../repositories/IPetsRepository';
import AppError from "../../../shared/errors/AppError";

interface Request {
  pet_id: string;
  user_id: string;
  motivation: string;
}

@injectable()
class SendReportService {
  constructor(
    @inject('PetsRepository')
    private petsRepository: IPetsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvaider,
  ) { }
  public async execute({ pet_id, user_id, motivation }: Request): Promise<void> {
    const pet = await this.petsRepository.findById(pet_id);

    if (!pet) {
      throw new AppError('Pet not found');
    }

    const reportTemplate = path.resolve(__dirname, '..', 'views', 'report.hbs',);

    await this.mailProvider.sendMail({
      to: {
        email: 'jeffersonts00@gmail.com',
        name: 'Jefferson',
      },
      subject: '[Love Pets] Denúncia de anúncio',
      templateData: {
        file: reportTemplate,
        variables: {
          pet_id,
          user_id,
          motivation,
          link: `${process.env.APP_WEB_URL}/pets/${pet_id}`,
        }
      }
    });
  }
}

export default SendReportService;