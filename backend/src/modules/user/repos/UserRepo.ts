import { Repo } from '../../../shared/infra/Repo';
import { User } from '../domain/user';
import { Model, Document } from 'mongoose';
import { UserMap } from '../mappers/UserMap';
import { Result } from '../../../shared/core/logic/Result';
import { Guard } from '../../../shared/core/logic/Guard';

export interface IUserRepo extends Repo<User> {
    findUserByEmail(email: string): Promise<User>;
    findUserById(id: string): Promise<User>;
    findUserByIdAndReturnAll(id: string): Promise<User>;
    findUserByUsername(username: string): Promise<User>;
    existsAndReturn(user: User): Promise<object>;
    findUserByIdAndDelete(id: string): Promise<boolean>;
}
export class UserRepo implements IUserRepo {
    private model: Model<Document>;
    constructor(model: any) {
        this.model = model;
    }
    async save(user: User): Promise<void> {
        const rawUser = UserMap.toPersistence(user);

        try {
            new this.model(rawUser).save();
            console.log('new user saved');
        } catch (err) {
            Result.fail<User>(err);
        }
    }
    async exists(user: User): Promise<boolean> {
        const isUserExist = await this.model.findOne({ email: user.email });
        return isUserExist ? true : false;
    }
    async findUserByEmail(email: string): Promise<User> {
        const rawUser: any = await this.model.findOne({ email }, { id: 1 });
        return UserMap.toDomain(rawUser);
    }
    async findUserById(id: string): Promise<User> {
        const rawUser: any = await this.model.findById(id, { username: 1, email: 1 });
        return UserMap.toDTO(rawUser);
    }
    async findUserByUsername(username: string): Promise<User> {
        try {
            const userOrError: any = await this.model.findOne({ username }, { username: 1, display_name: 1, email: 1 });
            const guardResult = Guard.againstNullOrUndefined(userOrError, 'userOrError');

            if (!guardResult.succeeded) return Result.success(false);

            const userDTO = UserMap.toDTO(userOrError);
            return Result.success(true, userDTO);
        } catch (err) {
            return Result.success(false);
        }
    }
    async existsAndReturn(user: User): Promise<object> {
        try {
            const userOrError: any = await this.model.findOne({ email: user.email }, { _id: 1, user_role: 1 });
            const guardResult = Guard.againstNullOrUndefined(userOrError, 'userOrError');

            if (!guardResult.succeeded) return Result.success(false);
            const userDTO = { id: userOrError.id, role: userOrError.user_role };
            return Result.success(true, userDTO);
        } catch (err) {
            return Result.success(false);
        }
    }
    async findUserByIdAndReturnAll(id: string): Promise<User> {
        try {
            const userOrError: any = await this.model.findById(id, {
                username: 1,
                display_name: 1,
                first_name: 1,
                last_name: 1,
                email: 1,
                profile_pic: 1,
            });
            const guardResult = Guard.againstNullOrUndefined(userOrError, 'userOrError');

            if (!guardResult) return Result.success(false);
            const userProfileDTO = UserMap.userProfileFromPersistenceToDTO(userOrError);
            return Result.success(true, userProfileDTO);
        } catch (err) {
            return Result.success(false);
        }
    }
    async findUserByIdAndDelete(id: string): Promise<boolean> {
        try {
            await this.model.findByIdAndDelete(id);
            return Result.success(true);
        } catch (err) {
            return Result.success(false);
        }
    }
}
