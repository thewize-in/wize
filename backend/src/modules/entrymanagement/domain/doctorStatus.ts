import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/logic/Result';

interface DoctorStatusProps {
    active: boolean;
    resume: boolean;
}

export class DoctorStatus extends ValueObject<DoctorStatusProps> {
    private constructor(props: DoctorStatusProps) {
        super(props);
    }
    public static create(props: DoctorStatusProps): Result<DoctorStatus> {
        return Result.ok<DoctorStatus>(new DoctorStatus(props));
    }
    public static createActiveStatus(): Result<DoctorStatus> {
        const activeStatus = { active: true, resume: true };
        return Result.ok<DoctorStatus>(new DoctorStatus(activeStatus));
    }
    public static createInactiveStatus(): Result<DoctorStatus> {
        const inactiveStatus = { active: false, resume: false };
        return Result.ok<DoctorStatus>(new DoctorStatus(inactiveStatus));
    }
    public static createPauseStatus(): Result<DoctorStatus> {
        const pauseStatus = { active: true, resume: false };
        return Result.ok<DoctorStatus>(new DoctorStatus(pauseStatus));
    }
    public static createResumeStatus(): Result<DoctorStatus> {
        const resumeStatus = { active: true, resume: true };
        return Result.ok<DoctorStatus>(new DoctorStatus(resumeStatus));
    }
    public isActive(): boolean {
        return this.props.active;
    }
    public isResume(): boolean {
        return this.props.resume;
    }
}
