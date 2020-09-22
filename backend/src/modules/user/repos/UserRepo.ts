import { Repo } from '../../../shared/infra/Repo';
import { Model, Document } from 'mongoose';
import { User } from '../domain/user';
import { Guard } from '../../../shared/core/logic/Guard';
import { UserMap } from '../mappers/UserMap';
import { UserSessionDTO } from '../domain/dtos/UserSessionDTO';
import { Result } from '../../../shared/core/logic/Result';
import { UserProfileDTO } from '../domain/dtos/UserProfileDTO';

export interface IUserRepo extends Repo<User> {
  getUserSessionDetails(email: string): Promise<UserSessionDTO>;
  getProfileByUserId(userId: string): Promise<Result<UserProfileDTO | boolean>>;
}
export class UserRepo implements IUserRepo {
  private model: Model<Document>;
  constructor(model: Model<Document>) {
    this.model = model;
  }
  async save(user: User): Promise<void> {
    const rawUser = UserMap.toPersistence(user);
    const userExist = this.exists(user.email);

    if (userExist) {
      await new this.model(rawUser).save();
    } else {
      await this.model.findOneAndUpdate(
        { user_id: user.userId.id.toString() },
        rawUser
      );
    }
  }
  async exists(email: string): Promise<boolean> {
    try {
      const isExist = await this.model.findOne({ email: email });
      const guardResult = Guard.againstNullOrUndefined(isExist, 'isExist');

      if (!guardResult.succeeded) return false;
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getUserSessionDetails(email: string) {
    const user: any = await this.model.findOne(
      { email: email },
      { user_id: 1, user_role: 1 }
    );
    const userSessionDetails: UserSessionDTO = {
      id: user.user_id,
      role: user.user_role,
    };
    return userSessionDetails;
  }
  async getProfileByUserId(
    userId: string
  ): Promise<Result<UserProfileDTO | boolean>> {
    const user: any = await this.model.findOne(
      { user_id: userId },
      { username: 1, display_name: 1, profile_pic: 1, email: 1 }
    );
    const guardResult = Guard.againstNullOrUndefined(user, 'user');

    if (!guardResult.succeeded) return Result.ok<boolean>(false);

    const userProfile: UserProfileDTO = {
      username: user.username,
      displayName: user.display_name,
      profilePic: user.profile_pic,
      email: user.email,
    };
    return Result.ok<UserProfileDTO>(userProfile);
  }
}
