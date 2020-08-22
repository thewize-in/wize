import { Repo } from '../../../../shared/infra/Repo';
import { Patient } from '../../domain/patient';
import { Document, Model } from 'mongoose';
import { PatientMap } from '../../mappers/patientMaps/PatientMap';
import { Result } from '../../../../shared/core/logic/Result';
import { Guard } from '../../../../shared/core/logic/Guard';

export interface IPatientRepo extends Repo<Patient> {
    getPatientByPatientId(patientId: string): Promise<Result<Patient>>;
}

export class PatientRepo implements IPatientRepo {
    private model: Model<Document>;
    constructor(model: Model<Document>) {
        this.model = model;
    }
    async save(patient: Patient): Promise<void> {
        const patientId = patient.patientId.id.toString();
        const exists = await this.exists(patientId);

        const rawPatient = PatientMap.toPersistence(patient);

        if (!exists) {
            try {
                await new this.model(rawPatient).save();
                console.log('new patient saved');
            } catch (error) {
                console.log(error);
                Result.fail<Patient>(error);
            }
        } else {
            await this.model.findOneAndUpdate({ patient_id: patientId }, rawPatient);
        }
    }
    async exists(patientId: string): Promise<boolean> {
        try {
            const patientExist = await this.model.findOne({ patient_id: patientId });
            if (!patientExist) return false;
            return true;
        } catch (error) {
            console.log('[PatientStatusRepo]: patient doesnot exists');
            return false;
        }
    }
    async getPatientByPatientId(patientId: string): Promise<Result<Patient>> {
        const rawPatient = await this.model.findOne({ patient_id: patientId });
        const guardResult = Guard.againstNullOrUndefined(rawPatient, 'rawPatinet');

        if (!guardResult.succeeded) return Result.fail<Patient>('[getPatientByPatientId]: not found');

        return Result.ok<Patient>(PatientMap.toDomain(rawPatient));
    }
}
