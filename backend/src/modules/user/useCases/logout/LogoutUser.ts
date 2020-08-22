import { UseCase } from '../../../../shared/domain/UseCase';
import { LogoutUserDTO } from './LogoutUserDTO';

type Request = LogoutUserDTO;
type Response = void;

export class LogoutUser implements UseCase<Request, Promise<Response>> {
    async execute(request: Request): Promise<Response> {
        request.session.cookie.expires = new Date();
        request.session.destroy(() => {});
    }
}
