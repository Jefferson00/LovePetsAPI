import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '../../../services/CreateUserService';
import DeleteUserService from '../../../services/DeleteUserService';

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password, phone } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            password,
            phone,
        });


        return response.json(classToClass(user));
    }
    public async delete(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const deleteUser = container.resolve(DeleteUserService);

        await deleteUser.execute(user_id);

        return response.send();
    }
}