import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/logic/Result';

interface DateAndTimeProps {
  value: number;
}
export class DateAndTime extends ValueObject<DateAndTimeProps> {
  get value(): number {
    return this.props.value;
  }
  private constructor(props: DateAndTimeProps) {
    super(props);
  }
  public static create(props?: DateAndTimeProps): Result<DateAndTime> {
    return Result.ok<DateAndTime>(new DateAndTime({ value: !!props.value ? props.value : this.generateTimeStamp() }));
  }
  private static generateTimeStamp(): number {
    return Math.floor(Date.now());
  }
}
