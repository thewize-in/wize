import { Repo } from '../../../shared/infra/Repo';
import { User } from '../domain/user';
import { Model, Document } from 'mongoose';
import { UserMap } from '../mappers/UserMap';
import { Result, ReturnResult } from '../../../shared/core/logic/Result';
import { Guard } from '../../../shared/core/logic/Guard';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';

export interface IUserRepo extends Repo<User> {
    findUserByEmail(email: string): Promise<ReturnResult>;
    findUserById(id: string): Promise<User>;
    findUserByIdAndReturnAll(id: string): Promise<ReturnResult>;
    findUserByUsername(username: string): Promise<ReturnResult>;
    existsAndReturn(user: User): Promise<ReturnResult>;
    findUserByIdAndDelete(id: string): Promise<ReturnResult>;
}
export class UserRepo implements IUserRepo {
    private model: Model<Document>;
    constructor(model: any) {
        this.model = model;
    }
    async save(user: User): Promise<void> {
        const rawUser = UserMap.toPersistence(user);

        try {
            await new this.model(rawUser).save();
            DomainEvents.dispatchEventsForAggregate(user.userId.id);
            console.log('new user saved');
        } catch (err) {
            Result.fail<User>(err);
        }
    }
    async exists(user: User): Promise<boolean> {
        const isUserExist = await this.model.findOne({ email: user.email });
        return isUserExist ? true : false;
    }
    async findUserByEmail(email: string): Promise<ReturnResult> {
        try {
            const userOrError: any = await this.model.findOne({ email }, { user_id: 1, user_role: 1 });
            const guardResult = Guard.againstNullOrUndefined(userOrError, 'userOrError');

            if (!guardResult.succeeded) return Result.success(false);

            return Result.success(true, UserMap.toUserSession(userOrError));
        } catch (error) {
            Result.fail<User>(error);
            return Result.success(false);
        }
    }
    async findUserById(id: string): Promise<User> {
        const rawUser: any = await this.model.findOne({ user_id: id }, { username: 1, email: 1 });
        return UserMap.toDTO(rawUser);
    }
    async findUserByUsername(username: string): Promise<ReturnResult> {
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
    async existsAndReturn(user: User): Promise<ReturnResult> {
        try {
            const userOrError: any = await this.model.findOne({ email: user.email }, { user_id: 1, user_role: 1 });
            const guardResult = Guard.againstNullOrUndefined(userOrError, 'userOrError');

            if (!guardResult.succeeded) return Result.success(false);
            const userDTO = { id: userOrError.user_id, role: userOrError.user_role };
            return Result.success(true, userDTO);
        } catch (err) {
            return Result.success(false);
        }
    }
    async findUserByIdAndReturnAll(id: string): Promise<ReturnResult> {
        try {
            const userOrError: any = await this.model.findOne(
                { user_id: id },
                {
                    username: 1,
                    display_name: 1,
                    first_name: 1,
                    last_name: 1,
                    email: 1,
                    profile_pic: 1,
                    id: -1,
                },
            );
            const guardResult = Guard.againstNullOrUndefined(userOrError, 'userOrError');

            if (!guardResult) return Result.success(false);
            const userProfileDTO = UserMap.userProfileFromPersistenceToDTO(userOrError);
            return Result.success(true, userProfileDTO);
        } catch (err) {
            return Result.success(false);
        }
    }
    async findUserByIdAndDelete(id: string): Promise<ReturnResult> {
        try {
            await this.model.findOneAndDelete({ user_id: id });
            return Result.success(true);
        } catch (err) {
            return Result.success(false);
        }
    }
}
