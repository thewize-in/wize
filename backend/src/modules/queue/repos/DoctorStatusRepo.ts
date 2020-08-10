import { Repo } from '../../../shared/infra/Repo';
import { Doctor } from '../domain/doctor';
import { Model, Document } from 'mongoose';
import { DoctorMap } from '../mappers/DoctorMap';
import { Result } from '../../../shared/core/logic/Result';

export interface IDoctorStatusRepo extends Repo<Doctor> {}

export class DoctorStatusRepo implements IDoctorStatusRepo {
    private model: Model<Document>;
    constructor(model: Model<Document>) {
        this.model = model;
    }
    async save(doctor: Doctor): Promise<void> {
        const rawDoctor = DoctorMap.toPersistence(doctor);
        try {
            await new this.model(rawDoctor).save();
            console.log('new doctor saved');
        } catch (error) {
            Result.fail<Doctor>(error);
        }
    }
    async exists(doctor: Doctor): Promise<boolean> {
        try {
            const isDoctorExists = await this.model.findById({ id: doctor.doctorId });
            return isDoctorExists ? true : false;
        } catch (error) {
            return false;
        }
    }
}
