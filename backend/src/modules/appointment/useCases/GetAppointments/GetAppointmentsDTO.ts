export type GetAppointmentsDTO = { doctorId: string; date: string; status: string; patientId: string };
export type GetAppointmentByDoctorIdDTO = { doctorId: string };
export type GetAppointmentByDoctorIdAndDateDTO = { doctorId: string; date: string };
export type GetAppointmentByDoctorIdAndStatusAndDateDTO = { doctorId: string; status: string; date: string };
export type GetAppointmentByDoctorIdAndStatusDTO = { doctorId: string; status: string };
