import { Repo } from '../../../shared/infra/Repo';
import { Doctor } from '../domain/doctor';
import { Model, Document } from 'mongoose';
import { DoctorStatusMap, DoctorStatusDTO } from '../mappers/DoctorStatusMap';
import { Result } from '../../../shared/core/logic/Result';
import { Guard } from '../../../shared/core/logic/Guard';

export interface IDoctorStatusRepo extends Repo<Doctor> {
    findDoctorByIdAndUpdateStatus(id: string, status: DoctorStatusDTO): Promise<boolean>;
    findDoctorStatusById(id: string): Promise<DoctorStatusDTO | boolean>;
}

export class DoctorStatusRepo implements IDoctorStatusRepo {
    private model: Model<Document>;
    constructor(model: Model<Document>) {
        this.model = model;
    }
    async save(doctor: Doctor): Promise<void> {
        const rawDoctor = DoctorStatusMap.toPersistence(doctor);
        try {
            await new this.model(rawDoctor).save();
            console.log('new doctor saved');
        } catch (error) {
            console.log(error);
            Result.fail<Doctor>(error);
        }
    }
    async exists(id: string): Promise<boolean> {
        try {
            const doctorExists = await this.model.findOne({ doctor_id: id });
            if (!doctorExists) return Result.success(false);
            return Result.success(true);
        } catch (error) {
            console.log('[DoctorStatusRepo]: doctor doesnot exists');
            return Result.success(false);
        }
    }
    async findDoctorByIdAndUpdateStatus(id: string, status: DoctorStatusDTO): Promise<boolean> {
        try {
            console.log(status);

            const statusUpdateOrError = await this.model.findOneAndUpdate({ doctor_id: id }, { $set: { status } });
            const guardResult = Guard.againstNullOrUndefined(statusUpdateOrError, 'statusUpdateOrError');
            if (!guardResult.succeeded) return Result.success(false);
            return Result.success(true);
        } catch (error) {
            console.log('[findDoctorByIdAndUpdateStatus]: doctor status doesnot update ' + error);
            return Result.success(false);
        }
    }
    async findDoctorStatusById(id: string): Promise<DoctorStatusDTO | boolean> {
        try {
            const doctorStatusOrError: any = await this.model.findOne({ doctor_id: id }, { status: 1 });
            const guardResult = Guard.againstNullOrUndefined(doctorStatusOrError, 'doctorStatusOrError');
            if (!guardResult.succeeded) return Result.success(false);

            const doctorStatus = DoctorStatusMap.toDomain(doctorStatusOrError.status);

            return Result.success(true, doctorStatus);
        } catch (error) {
            console.log(`[findDoctorById] ${error}`);
            return Result.success(false);
        }
    }
}
