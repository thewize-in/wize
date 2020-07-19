import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Guard } from '../../../shared/core/logic/Guard';
import { Result } from '../../../shared/core/logic/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Role } from './Role';

interface UserProps {
    role: Role;
    username: string;
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
    isEmailVerified: boolean;
    profilePic?: string;
    googleId?: string;
}

export class User extends AggregateRoot<UserProps> {
    get id(): UniqueEntityID {
        return this._id;
    }
    get googleId(): string {
        return this.props.googleId;
    }
    get username(): string {
        return this.props.username;
    }
    get displayName(): string {
        return this.props.username;
    }
    get firstName(): string {
        return this.props.firstName;
    }
    get lastName(): string {
        return this.props.lastName;
    }
    get email(): string {
        return this.props.email;
    }
    get isEmailVerified(): boolean {
        return this.props.isEmailVerified;
    }
    get profilePicture(): string {
        return this.props.profilePic;
    }
    get role(): Role {
        return this.props.role;
    }
    set role(role: Role) {
        this.props.role = role;
    }
    private constructor(props: UserProps) {
        super(props);
    }
    public static create(props: UserProps): Result<User> {
        const user = new User({
            ...props,
            displayName: props.username,
        });
        return Result.ok<User>(user);
    }
}
