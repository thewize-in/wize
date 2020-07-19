import { Mapper } from '../../../shared/infra/Mapper';
import { User } from '../domain/user';
import { TextUtils } from '../../../shared/utils/TextUtils';

export class UserMap implements Mapper<User> {
    public static toPersistence(user: User): any {
        return {
            google_id: user.googleId,
            uuid: user.id.toValue(),
            username: TextUtils.removeWhiteSpace(user.username).toLowerCase(),
            display_name: user.displayName,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            is_email_verified: user.isEmailVerified,
            profile_pic: user.profilePicture,
            user_role: user.role,
        };
    }
    public static toDomain(raw: any): any {
        return {
            googleId: raw.google_id,
            username: raw.username,
            displayName: raw.display_name,
            firstName: raw.first_name,
            lastName: raw.last_name,
            email: raw.email,
            isEmailVerified: raw.is_email_verified,
            profilePic: raw.profile_pic,
        };
    }
    public static toDTO(raw: any): any {
        return {
            username: raw.username,
            displayName: raw.display_name,
            email: raw.email,
        };
    }
    public static userProfileFromPersistenceToDTO(raw: any): any {
        return {
            username: raw.username,
            displayName: raw.display_name,
            firstName: raw.first_name,
            lastName: raw.last_name,
            email: raw.email,
            profilePic: raw.profile_pic,
        };
    }
}