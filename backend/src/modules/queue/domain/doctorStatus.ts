import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/logic/Result';

interface DoctorStatusProps {
    active: boolean;
    pause: boolean;
}

export class DoctorStatus extends ValueObject<DoctorStatusProps> {
    constructor(props: DoctorStatusProps) {
        super(props);
    }
    public static create(props: DoctorStatusProps): Result<DoctorStatus> {
        return Result.ok<DoctorStatus>(new DoctorStatus(props));
    }
}
