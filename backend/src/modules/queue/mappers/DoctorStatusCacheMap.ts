import { Mapper } from '../../../shared/infra/Mapper';
import { Doctor } from '../domain/doctor';

export type DoctorStatusCacheDTO = {
    active: boolean;
    pause: boolean;
};

export class DoctorStatusCacheMap implements Mapper<Doctor> {
    public static toPersistence(status: DoctorStatusCacheDTO) {
        return JSON.stringify(status);
    }
    public static toDomain(raw: any) {
        return JSON.parse(raw);
    }
}
