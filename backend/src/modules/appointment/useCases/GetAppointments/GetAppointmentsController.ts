import { BaseController } from '../../../../shared/infra/BaseController';
import { GetAppointmentsDTO } from './GetAppointmentsDTO';
import { GetAppointmentsByDoctorId } from './GetAppointmentsByDoctorId';
import { GetAppointmentsByDoctorIdAndStatus } from './GetAppointmentsByDoctorIdAndStatus';
import { GetAppointmentsByDoctorIdAndDate } from './GetAppointmentsByDoctorIdAndDate';

export class GetAppointmentsController extends BaseController {
  private getAppointmentsByDoctorId: GetAppointmentsByDoctorId;
  private getAppointmentsByDoctorIdAndStatus: GetAppointmentsByDoctorIdAndStatus;
  private getAppointmentsByDoctorIdAndDate: GetAppointmentsByDoctorIdAndDate;
  constructor(
    getAppointmentsByDoctorId: GetAppointmentsByDoctorId,
    getAppointmentsByDoctorIdAndStatus: GetAppointmentsByDoctorIdAndStatus,
    getAppointmentsByDoctorIdAndDate: GetAppointmentsByDoctorIdAndDate
  ) {
    super();
    this.getAppointmentsByDoctorId = getAppointmentsByDoctorId;
    this.getAppointmentsByDoctorIdAndStatus = getAppointmentsByDoctorIdAndStatus;
    this.getAppointmentsByDoctorIdAndDate = getAppointmentsByDoctorIdAndDate;
  }
  async executeImpl(): Promise<any> {
    const dto: GetAppointmentsDTO = {
      doctorId: this.request.query['doctorId'] as string,
      patientId: this.request.query['patientId'] as string,
      status: this.request.query['status'] as string,
      date: this.request.query['date'] as string,
    };

    try {
      if (!!dto.doctorId && !!dto.status && !!dto.date) {
      }
      if (!!dto.doctorId && !!dto.date) {
        const result = await this.getAppointmentsByDoctorIdAndDate.execute({
          doctorId: dto.doctorId,
          date: dto.date,
        });

        if (result.isFailure) {
          return this.fail('not found');
        }
        return this.ok(this.response, result.getValue());
      }
      if (!!dto.doctorId && !!dto.status) {
        const result = await this.getAppointmentsByDoctorIdAndStatus.execute({
          doctorId: dto.doctorId,
          status: dto.status,
        });

        if (result.isFailure) {
          return this.fail('not found');
        }
        return this.ok(this.response, result.getValue());
      }
      if (!!dto.doctorId) {
        const result = await this.getAppointmentsByDoctorId.execute({ doctorId: dto.doctorId });

        if (result.isFailure) {
          return this.fail('not found');
        }
        return this.ok(this.response, result.getValue());
      }
    } catch (err) {
      return this.fail(err);
    }
  }
}
