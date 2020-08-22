import { Repo } from '../../../../shared/infra/Repo';
import { Patient } from '../../domain/patient';
import { Model, Document } from 'mongoose';
import { PatientStatusMap } from '../../mappers/patientMaps/PatientStatusMap';
import { Result, ReturnResult } from '../../../../shared/core/logic/Result';
import { Guard } from '../../../../shared/core/logic/Guard';

export interface IPatientStatusRepo extends Repo<Patient> {
    findPatientStatusById(id: string): Promise<ReturnResult>;
}

export class PatientStatusRepo implements IPatientStatusRepo {
    private model: Model<Document>;
    constructor(model: Model<Document>) {
        this.model = model;
    }
    async save(patient: Patient): Promise<void> {
        const rawPatient = PatientStatusMap.toPersistence(patient);

        try {
            await new this.model(rawPatient).save();
            console.log('new patient saved');
        } catch (error) {
            console.log(error);
            Result.fail<Patient>(error);
        }
    }
    async exists(id: string): Promise<boolean> {
        try {
            const patientExistsOrError = await this.model.findOne({ patient_id: id });
            const gaurdResult = Guard.againstNullOrUndefined(patientExistsOrError, 'patientExistsOrError');
            if (!gaurdResult.succeeded) return Result.success(false);
            return Result.success(true);
        } catch (error) {
            console.log('[PatientStatusRepo]: patient doesnot exists');
            return Result.success(false);
        }
    }
    async findPatientStatusById(id: string): Promise<ReturnResult> {
        try {
            const patientOrError: any = await this.model.findOne({ patient_id: id }, { status: 1 });
            const gaurdResult = Guard.againstNullOrUndefined(patientOrError, 'patientOrError');

            if (!gaurdResult.succeeded) return Result.success(false);
            const patientStatus = { joined: patientOrError.status.joined }; // need refactoring
            return Result.success(true, patientStatus);
        } catch (error) {
            console.log('[findPatientStatusById]: patient status not found');
            return Result.success(false);
        }
    }
}
