import { CacheRepo } from '../../../shared/infra/CacheRepo';
import { DoctorStatusDTO } from '../mappers/DoctorStatusMap';
import { RedisClient } from 'redis';
import { DoctorStatusCacheDTO, DoctorStatusCacheMap } from '../mappers/DoctorStatusCacheMap';
import { Guard } from '../../../shared/core/logic/Guard';
import { Result } from '../../../shared/core/logic/Result';

export interface IDoctorStatusCacheRepo extends CacheRepo<DoctorStatusCacheDTO> {
    findDoctorStatusById(id: string): Promise<DoctorStatusDTO>;
}

export class DoctorStatusCacheRepo implements IDoctorStatusCacheRepo {
    private model: RedisClient;
    constructor(model: RedisClient) {
        this.model = model;
    }
    async save(id: string, status: DoctorStatusCacheDTO): Promise<void> {
        const rawDoctorStatus = DoctorStatusCacheMap.toPersistence(status);
        const doctorId = this.minifyDoctorId(id);

        try {
            this.model.set(doctorId, rawDoctorStatus);
            console.log('successfully saved to cache');
        } catch (error) {
            console.log(`[Doctor Status Cache Repo]: ${error}`);
        }
    }
    async exists(): Promise<boolean> {
        return;
    }
    async findDoctorStatusById(id: string): Promise<DoctorStatusCacheDTO> {
        const doctorId = this.minifyDoctorId(id);
        try {
            const findDoctorStatusPromise = new Promise((resolve, reject) => {
                this.model.get(doctorId, (err, cacheResult) => {
                    if (err) return reject(err);
                    resolve(cacheResult);
                });
            });
            const doctorStatusOrError = await findDoctorStatusPromise;

            const guardResult = Guard.againstNullOrUndefined(doctorStatusOrError, 'doctorStatusOrError');
            if (!guardResult.succeeded) return Result.success(false);

            const doctorStatus = DoctorStatusCacheMap.toDomain(doctorStatusOrError);

            return Result.success(true, doctorStatus);
        } catch (error) {
            console.log(`[findDoctorStatusById]: ${error}`);
            return Result.success(false);
        }
    }
    private minifyDoctorId(id: string): string {
        const minifyLength: number = 4;
        const idLength: number = id.length;
        return id.slice(idLength - minifyLength);
    }
}
