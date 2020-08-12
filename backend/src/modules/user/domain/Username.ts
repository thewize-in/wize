import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/logic/Result';

interface UsernameProps {
    value: string;
}
export class Username extends ValueObject<UsernameProps> {
    get value(): string {
        return this.props.value;
    }
    private constructor(props: UsernameProps) {
        super(props);
    }
    public static create(email: string): Result<Username> {
        const extractedUsername = Username.emailToUsername(email);
        return Result.ok<Username>(new Username({ value: extractedUsername }));
    }
    private static emailToUsername(email: string): string {
        let splitAT = email.split('@');
        let splitedATUsername = splitAT[0];
        let splitDOT = splitedATUsername.split('.');
        const username = splitDOT.join('');
        return username;
    }
}
