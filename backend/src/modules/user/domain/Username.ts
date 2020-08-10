import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/logic/Result';
import { TextUtils } from '../../../shared/utils/TextUtils';

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
        const extractedUsername = TextUtils.emailtoUsername(email);
        return Result.ok<Username>(new Username({ value: extractedUsername }));
    }
}
