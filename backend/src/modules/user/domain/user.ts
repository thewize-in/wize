import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Result } from '../../../shared/core/logic/Result';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Role } from './Role';
import { Username } from './Username';
import { UserId } from './UserId';
import { UserCreated } from './events/UserCreated';

interface UserProps {
    userId: UserId;
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
    get userId(): UserId {
        return UserId.create(this._id).getValue();
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
    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }
    public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
        const isNewUser = id ? false : true;

        const user = new User(
            {
                ...props,
                username: Username.create(props.email).getValue(),
                displayName: `${props.firstName ? props.firstName : props.username.value}`,
            },
            id,
        );
        if (isNewUser) {
            user.addDomainEvent(new UserCreated(user));
        }
        return Result.ok<User>(user);
    }
}
