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
    get totalPatientNumber(): number {
        return (this.props.patientStats.props.totalPatientNumber = this.patientList.length);
    }
    get currentPatientNumber(): number {
        return this.props.patientStats.props.currentPatientNumber;
    }
    get currentPatientDetails(): PatientDetail {
        return (this.props.patientStats.props.currentPatientDetails = this.patientList[this.currentPatientNumber - 1]);
    }

    constructor(props: PatientEntryBookProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: PatientEntryBookProps, id?: UniqueEntityID): Result<PatientEntryBook> {
        const isNewPatientEntryBook = id ? false : true;

        const patientEntryBook = new PatientEntryBook({ ...props }, id);

        const guardResult = Guard.againstNullOrUndefined(patientEntryBook, 'patientEntryBook');
        if (!guardResult.succeeded) throw Result.fail<PatientEntryBook>(guardResult.message);

        return Result.ok<PatientEntryBook>(patientEntryBook);
    }
    public static createDefault(id: UniqueEntityID): Result<PatientEntryBook> {
        const patientStats = PatientStats.create({
            totalPatientNumber: 0,
            currentPatientNumber: 0,
            currentPatientDetails: null,
        }).getValue();
        const patientEntryBook = new PatientEntryBook({ patientList: [], patientStats }, id);

        const guardResult = Guard.againstNullOrUndefined(patientEntryBook, 'patientEntryBook');
        if (!guardResult.succeeded) throw Result.fail<PatientEntryBook>(guardResult.message);

        return Result.ok<PatientEntryBook>(patientEntryBook);
    }

    public updateCurrentPatientNumber(): void {
        this.props.patientStats.incrCurrentPatientNumber();
    }

    public createOfflineEntry(patientDetails: PatientDetail): void {
        this.patientList.push(patientDetails);
    }

    public createOnlineEntry(patientDetails: PatientDetail, patient: Patient): void {
        const entryIndex = this.findEntryIndexById(patientDetails.id);

        if (this.entryExist(entryIndex)) {
            patient.setWatingNumber(entryIndex + 1);
        } else {
            this.patientList.push(patientDetails);
            patient.setWatingNumber(this.totalPatientNumber);
        }

        this.addDomainEvent(new PatientEntryCreated(this, patient));
    }

    private findEntryIndexById(id: string): number {
        return this.patientList.findIndex((entry) => entry.id === id);
    }

    private entryExist(index: number): boolean {
        const NOT_FOUND = -1;
        return index === NOT_FOUND ? false : true;
    }
}
