import CreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import {uuid} from 'uuidv4';

import User from "../../infra/typeorm/entities/User";
import IUserTokensRepository from "../IUserTokensRepository";


class FakeUserTokensRepository implements IUserTokensRepository{
    private userTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken>{
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        })

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string):Promise<UserToken | undefined>{
        const userToken = this.userTokens.find(UToken => UToken.token === token);

        return userToken;
    }
    
}

export default FakeUserTokensRepository;