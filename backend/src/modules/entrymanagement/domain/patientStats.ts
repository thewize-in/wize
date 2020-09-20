import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/logic/Result';
import { Guard } from '../../../shared/core/logic/Guard';
import { PatientDetail } from './entryBook';

interface PatientStatsProps {
  totalPatientNumber?: number;
  currentPatientNumber?: number;
  currentPatientDetails?: PatientDetail;
}

export class PatientStats extends ValueObject<PatientStatsProps> {
  private constructor(props: PatientStatsProps) {
    super(props);
  }
  public static create(props: PatientStatsProps): Result<PatientStats> {
    const patientStatsOrError = new PatientStats({ ...props });

    const guardResult = Guard.againstNullOrUndefined(
      patientStatsOrError,
      'patientStatsOrError'
    );
    if (!guardResult.succeeded)
      return Result.fail<PatientStats>(`[PatientStats]: creation failed`);

    return Result.ok<PatientStats>(patientStatsOrError);
  }
  public static createDefault(): Result<PatientStats> {
    const defaultPatientStats: PatientStatsProps = {
      totalPatientNumber: 0,
      currentPatientNumber: 0,
      currentPatientDetails: null,
    };
    return Result.ok<PatientStats>(new PatientStats(defaultPatientStats));
  }

  public incrCurrentPatientNumber() {
    this.props.currentPatientNumber++;
  }
}
