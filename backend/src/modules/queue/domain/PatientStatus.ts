import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/logic/Result';

interface PatientStatusProps {
    joined: boolean;
    joinedDoctorId: string;
}

export class PatientStatus extends ValueObject<PatientStatusProps> {
    constructor(props: PatientStatusProps) {
        super(props);
    }
    public static create(props: PatientStatusProps): Result<PatientStatus> {
        return Result.ok<PatientStatus>(new PatientStatus(props));
    }
}
