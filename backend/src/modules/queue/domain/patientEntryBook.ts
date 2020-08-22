import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/logic/Result';
import { Guard } from '../../../shared/core/logic/Guard';
import { BookId } from './bookId';
import { Patient } from './patient';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { PatientEntryCreated } from './events/PatientEntryCreated';
import { PatientStats } from './patientStats';

export interface PatientDetail {
    name: string;
    id?: string;
    tag: string;
}
interface PatientEntryBookProps {
    bookId?: BookId;
    patientList: PatientDetail[];
    patientStats?: PatientStats;
}

export class PatientEntryBook extends AggregateRoot<PatientEntryBookProps> {
    get bookId(): BookId {
        return BookId.create(this._id).getValue();
    }
    get patientList(): PatientDetail[] {
        return this.props.patientList;
    }
    get patientStats(): PatientStats {
        return this.props.patientStats;
    }

    get totalPatientNumber(): number {
        return (this.props.patientStats.props.totalPatientNumber = this.patientList.length);
    }
    get currentPatientDetails() {
        return (this.props.patientStats.props.currentPatientDetails = this.patientList[
            this.patientStats.currentPatientNumber
        ]);
    }

    constructor(props: PatientEntryBookProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public createOfflineEntry(patientDetails: PatientDetail) {
        this.patientList.push(patientDetails);
    }
    public createOnlineEntry(patientDetails: PatientDetail, patient: Patient) {
        const entryIndex = this.findEntryIndexById(patientDetails.id);
        console.log(entryIndex + 1);

        if (this.entryExist(entryIndex)) {
            patient.setWatingNumber(entryIndex + 1);
        } else {
            this.patientList.push(patientDetails);
            patient.setWatingNumber(this.totalPatientNumber);
        }

        this.addDomainEvent(new PatientEntryCreated(this, patient));
    }
    private findEntryIndexById(id: string) {
        return this.patientList.findIndex((entry) => entry.id === id);
    }
    private entryExist(index: number): boolean {
        const NOT_FOUND = -1;
        return index === NOT_FOUND ? false : true;
    }
    public static create(props: PatientEntryBookProps, id?: UniqueEntityID): Result<PatientEntryBook> {
        const isNewPatientEntryBook = id ? false : true;

        const patientEntryBook = new PatientEntryBook({ ...props }, id);

        const guardResult = Guard.againstNullOrUndefined(patientEntryBook, 'patientEntryBook');
        if (!guardResult.succeeded) throw Result.fail<PatientEntryBook>(guardResult.message);

        return Result.ok<PatientEntryBook>(patientEntryBook);
    }
}
