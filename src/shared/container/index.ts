import { container } from 'tsyringe';

import '@modules/users/providers'
import '@modules/pets/providers'

import mailConfig from '@config/mail';
import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IMailProvaider from './providers/MailProvider/models/IMailProvider';
import EtherealMailProvider from './providers/MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from './providers/MailProvider/implementations/SESMailProvider';

import IMailTemplateProvaider from './providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import IStorageProvider from './providers/StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './providers/StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from './providers/StorageProvider/implementations/S3StorageProvider';

import IPetsRepository from '@modules/pets/repositories/IPetsRepository';
import PetsRepository from '@modules/pets/infra/typeorm/repositories/PetsRepository';

import IImagesRepository from '@modules/pets/repositories/IImagesRepository';
import ImagesRepository from '@modules/pets/infra/typeorm/repositories/ImagesRepository';

import IFavUserPetsRepository from '@modules/pets/repositories/IFavUserPetsRepository';
import FavUserPetsRepository from '@modules/pets/infra/typeorm/repositories/FavUserPetsRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IPetsRepository>(
    'PetsRepository',
    PetsRepository,
);

container.registerSingleton<IFavUserPetsRepository>(
    'FavUserPetsRepository',
    FavUserPetsRepository,
);

container.registerSingleton<IImagesRepository>(
    'ImagesRepository',
    ImagesRepository,
);

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    uploadConfig.driver === 'disk' ?
        DiskStorageProvider :
        S3StorageProvider
    ,
);

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository,
);

container.registerSingleton<IMailTemplateProvaider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvaider>(
    'MailProvider',
    mailConfig.driver === 'ethereal' ?
        container.resolve(EtherealMailProvider) :
        container.resolve(SESMailProvider),
);
