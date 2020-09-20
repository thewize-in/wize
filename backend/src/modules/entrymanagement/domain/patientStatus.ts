import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/logic/Result';

interface PatientStatusProps {
    joined: boolean;
}

export class PatientStatus extends ValueObject<PatientStatusProps> {
    constructor(props: PatientStatusProps) {
        super(props);
    }
    public static create(props: PatientStatusProps): Result<PatientStatus> {
        return Result.ok<PatientStatus>(new PatientStatus(props));
    }
    public static createDefaultStatus() {
        const patientDefaultStatusProps: PatientStatusProps = {
            joined: false,
        };
        return Result.ok<PatientStatus>(new PatientStatus(patientDefaultStatusProps));
    }
    public static createJoinedStatus(): Result<PatientStatus> {
        const patientJoinedStatusProps: PatientStatusProps = {
            joined: true,
        };
        return Result.ok<PatientStatus>(new PatientStatus(patientJoinedStatusProps));
    }
    public static createLeavedStatus() {
        const patientLeavedStatusProps: PatientStatusProps = {
            joined: false,
        };
        return Result.ok<PatientStatus>(new PatientStatus(patientLeavedStatusProps));
    }
}
