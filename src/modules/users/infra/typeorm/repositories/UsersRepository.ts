import CreateUserDTO from "../../../dtos/ICreateUserDTO";
import IUsersRepository from "../../../repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import User from "../entities/User";


class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { id },
        });

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    public async findByEmailOrPhone(email: string, phone: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: [{ email }, { phone }]
        });

        return user;
    }

    public async create({ email, name, password, phone }: CreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({ email, name, password, phone });

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return await this.ormRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }
}

export default UsersRepository;