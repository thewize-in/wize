import { authConfig } from '../../../../shared/config/authConfig';
import { BaseController } from '../../../../shared/infra/BaseController';
import { LogoutUser } from './LogoutUser';
import { LogoutUserDTO } from './LogoutUserDTO';

export class LogoutUserController extends BaseController {
  private useCase: LogoutUser;
  constructor(useCase: LogoutUser) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(): Promise<void> {
    const dto: LogoutUserDTO = this.request;

    await this.useCase.execute(dto);
    return this.response
      .clearCookie('user')
      .redirect(`http://192.168.43.215:${authConfig.port}/login`);
  }
}
