import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/logic/Result';

interface StatusProps {
  value: string;
}
export class Status extends ValueObject<StatusProps> {
  get value(): string {
    return this.props.value;
  }
  private constructor(props: StatusProps) {
    super(props);
  }
  public static created(): Result<Status> {
    return Result.ok<Status>(new Status({ value: 'created' }));
  }
  public static unchecked(): Result<Status> {
    return Result.ok<Status>(new Status({ value: 'unchecked' }));
  }
  public static rescheduled(): Result<Status> {
    return Result.ok<Status>(new Status({ value: 'rescheduled' }));
  }
  public static cancelled(): Result<Status> {
    return Result.ok<Status>(new Status({ value: 'cancelled' }));
  }
  public static checked(): Result<Status> {
    return Result.ok<Status>(new Status({ value: 'checked' }));
  }
}
