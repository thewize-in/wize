import { UseCase } from '../../../../shared/domain/UseCase';
import { LogoutUserDTO } from './LogoutUserDTO';

type LogoutUserRequest = LogoutUserDTO;
type LogoutUserResponse = void;

export class LogoutUser implements UseCase<LogoutUserRequest, Promise<LogoutUserResponse>> {
    async execute(request: LogoutUserRequest): Promise<LogoutUserResponse> {
        request.session.cookie.expires = new Date();
        request.session.destroy(() => {});
    }
}
