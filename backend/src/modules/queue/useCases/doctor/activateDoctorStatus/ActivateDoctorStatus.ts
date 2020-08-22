import { UseCase } from '../../../../../shared/domain/UseCase';
import { IDoctorRepo } from '../../../repos/doctorRepos/DoctorRepo';
import { IDoctorStatusCacheRepo } from '../../../repos/doctorRepos/DoctorStatusCacheRepo';
import { Doctor } from '../../../domain/doctor';
import { UniqueEntityID } from '../../../../../shared/domain/UniqueEntityID';
import { DoctorStatus } from '../../../domain/doctorStatus';
import { PatientEntryBook } from '../../../domain/patientEntryBook';
import { IPatientEntryBookRepo } from '../../../repos/patientEntryBookRepos/PatientEntryBookRepo';
import { PatientStats } from '../../../domain/patientStats';

type Request = { id: string };
type Response = boolean;

export class ActivateDoctorStatus implements UseCase<Request, Response> {
    private doctorRepo: IDoctorRepo;
    private doctorStatusCacheRepo: IDoctorStatusCacheRepo;
    private patientEntryBookRepo: IPatientEntryBookRepo;
    constructor(
        doctorRepo: IDoctorRepo,
        doctorStatusCacheRepo: IDoctorStatusCacheRepo,
        patientEntryBookRepo: IPatientEntryBookRepo,
    ) {
        this.doctorRepo = doctorRepo;
        this.doctorStatusCacheRepo = doctorStatusCacheRepo;
        this.patientEntryBookRepo = patientEntryBookRepo;
    }
    async execute(request: Request): Promise<Response> {
        const { id } = request;
        try {
            const doctorExist: any = await this.doctorRepo.exists(id);

            const doctorActiveStatus = DoctorStatus.createActiveStatus().getValue();
            let doctor: Doctor;

            if (doctorExist) {
                doctor = (await this.doctorRepo.getDoctorByDoctorId(id)).getValue();
                doctor.updateStatus(doctorActiveStatus);
            } else {
                const doctorId = new UniqueEntityID(id);
                doctor = Doctor.create({ status: doctorActiveStatus }, doctorId).getValue();
                const patientEntryBook: PatientEntryBook = PatientEntryBook.create(
                    {
                        patientList: [],
                        patientStats: PatientStats.create({
                            totalPatientNumber: 0,
                            currentPatientNumber: 0,
                            currentPatientDetails: null,
                        }).getValue(),
                    },
                    doctorId,
                ).getValue();
                await this.patientEntryBookRepo.save(patientEntryBook);
            }

            await this.doctorRepo.save(doctor);
            await this.doctorStatusCacheRepo.save(id, doctorActiveStatus);

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    }
}
