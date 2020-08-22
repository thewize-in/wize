import { Repo } from '../../../../shared/infra/Repo';
import { Doctor } from '../../domain/doctor';
import { Model, Document } from 'mongoose';
import { DoctorMap } from '../../mappers/doctorMaps/DoctorMap';
import { Result } from '../../../../shared/core/logic/Result';
import { Guard } from '../../../../shared/core/logic/Guard';
import { DomainEvents } from '../../../../shared/domain/events/DomainEvents';

export interface IDoctorRepo extends Repo<Doctor> {
    getDoctorByDoctorId(doctorId: string): Promise<Result<Doctor>>;
}

export class DoctorRepo implements IDoctorRepo {
    private model: Model<Document>;
    constructor(model: Model<Document>) {
        this.model = model;
    }
    async save(doctor: Doctor): Promise<void> {
        const doctorId = doctor.doctorId.id.toString();
        const exists = await this.exists(doctorId);
        const rawDoctor = DoctorMap.toPersistence(doctor);
        if (!exists) {
            try {
                await new this.model(rawDoctor).save();
                console.log('new doctor saved');
            } catch (error) {
                Result.fail<Doctor>(error);
            }
        } else {
            await this.model.findOneAndUpdate({ doctor_id: doctorId }, rawDoctor);
        }
    }

    async exists(id: string): Promise<boolean> {
        try {
            const doctorExist = await this.model.findOne({ doctor_id: id });
            if (!doctorExist) return false;
            return true;
        } catch (error) {
            console.log('[DoctorStatusRepo]: doctor doesnot exists');
            return false;
        }
    }
    async getDoctorByDoctorId(doctorId: string): Promise<Result<Doctor>> {
        const rawDoctor = await this.model.findOne({ doctor_id: doctorId });
        const guardResult = Guard.againstNullOrUndefined(rawDoctor, 'rawDoctor');

        if (!guardResult.succeeded) return Result.fail<Doctor>('[getDoctorByDoctorId]: not found');

        return Result.ok<Doctor>(DoctorMap.toDomain(rawDoctor));
    }
}
