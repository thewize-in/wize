import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Result } from '../../../shared/core/logic/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Role } from './Role';
import { Username } from './Username';

interface UserProps {
    role: Role;
    username: Username;
    displayName?: string;
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
    get username(): Username {
        return this.props.username;
    }
    set username(value: Username) {
        this.props.username = value;
    }
    get displayName(): string {
        return this.props.displayName;
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
            username: Username.create(props.email).getValue(),
            displayName: `${props.firstName ? props.firstName : props.username.value}`,
        });
        return Result.ok<User>(user);
    }
}
