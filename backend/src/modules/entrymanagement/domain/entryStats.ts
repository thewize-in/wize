import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/logic/Result';
import { Guard } from '../../../shared/core/logic/Guard';
import { EntryDetail } from './list';

interface EntryStatsProps {
  totalEntries?: number;
  currentEntryNumber?: number;
  currentEntryDetails?: EntryDetail;
}

export class EntryStats extends ValueObject<EntryStatsProps> {
  private constructor(props: EntryStatsProps) {
    super(props);
  }
  public static create(props: EntryStatsProps): Result<EntryStats> {
    const entryStatsOrError = new EntryStats({ ...props });

    const guardResult = Guard.againstNullOrUndefined(
      entryStatsOrError,
      'entryStatsOrError'
    );
    if (!guardResult.succeeded)
      return Result.fail<EntryStats>(`[EntryStats]: creation failed`);

    return Result.ok<EntryStats>(entryStatsOrError);
  }
  public static createDefault(): Result<EntryStats> {
    const defaultEntryStats: EntryStatsProps = {
      totalEntries: 0,
      currentEntryNumber: 0,
      currentEntryDetails: null,
    };
    return Result.ok<EntryStats>(new EntryStats(defaultEntryStats));
  }

  public incrCurrentEntryNumber() {
    this.props.currentEntryNumber++;
  }
}
