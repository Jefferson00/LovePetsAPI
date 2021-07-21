import CreateUserDTO from "../../dtos/ICreateUserDTO";
import IUsersRepository from "../IUsersRepository";

import { uuid } from 'uuidv4';

import User from "../../infra/typeorm/entities/User";


class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const user = this.users.find(user => user.id === id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(user => user.email === email);

        return user;
    }

    public async findByEmailOrPhone(email: string, phone: string): Promise<User | undefined> {
        const user = this.users.find(user => (user.email === email || user.phone === phone));

        return user;
    }

    public async create({ email, name, password, phone }: CreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid(), email, name, password, phone });

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

        return this.users[findIndex] = user;
    }

    public async delete(id: string): Promise<void> {
        const findIndex = this.users.findIndex(findUser => findUser.id === id);

        this.users.splice(findIndex, 1);
    }
}

export default FakeUsersRepository;