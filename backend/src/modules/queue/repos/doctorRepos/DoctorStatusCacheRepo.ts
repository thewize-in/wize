import { CacheRepo } from '../../../../shared/infra/CacheRepo';
import { RedisClient } from 'redis';
import { DoctorStatusCacheMap } from '../../mappers/doctorMaps/DoctorStatusCacheMap';
import { Guard } from '../../../../shared/core/logic/Guard';
import { Result } from '../../../../shared/core/logic/Result';
import { DoctorStatus } from '../../domain/doctorStatus';

export interface IDoctorStatusCacheRepo extends CacheRepo<DoctorStatus> {
    getDoctorStatusById(id: string): Promise<Result<DoctorStatus>>;
}

export class DoctorStatusCacheRepo implements IDoctorStatusCacheRepo {
    private model: RedisClient;
    constructor(model: RedisClient) {
        this.model = model;
    }
    async save(doctorId: string, doctorStatus: DoctorStatus): Promise<void> {
        const rawDoctorStatus = DoctorStatusCacheMap.toPersistence(doctorStatus);
        const minifiedDoctorId = this.minifyDoctorId(doctorId);

        try {
            this.model.set(minifiedDoctorId, rawDoctorStatus);
            console.log('successfully saved to cache');
        } catch (error) {
            console.log(`[Doctor Status Cache Repo]: ${error}`);
        }
    }
    async exists(): Promise<boolean> {
        return;
    }
    async getDoctorStatusById(doctorId: string): Promise<Result<DoctorStatus>> {
        const minifiedDoctorId = this.minifyDoctorId(doctorId);

        try {
            const getDoctorStatusPromise = new Promise((resolve, reject) => {
                this.model.get(minifiedDoctorId, (err, cacheResult) => {
                    if (err) return reject(err);
                    resolve(cacheResult);
                });
            });

            const doctorStatusOrError = await getDoctorStatusPromise;

            const guardResult = Guard.againstNullOrUndefined(doctorStatusOrError, 'doctorStatusOrError');
            if (!guardResult.succeeded) return Result.fail<DoctorStatus>('[getDoctorStatusById]: cache missed');

            return Result.ok<DoctorStatus>(DoctorStatusCacheMap.toDomain(doctorStatusOrError));
        } catch (error) {
            return Result.fail<DoctorStatus>(error);
        }
    }
    private minifyDoctorId(id: string): string {
        const minifyLength: number = 4;
        const idLength: number = id.length;
        return id.slice(idLength - minifyLength);
    }
}
