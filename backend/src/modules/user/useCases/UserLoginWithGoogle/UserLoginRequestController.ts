import { BaseController } from '../../../../shared/infra/BaseController';
import { IGoogleService } from '../../../../shared/services/authProviders/provider/googleProvider';

export class UserLoginRequestController extends BaseController {
  private googleService: IGoogleService;
  constructor(googleService: IGoogleService) {
    super();
    this.googleService = googleService;
  }
  async executeImpl(): Promise<any> {
    const user = this.request.session['user'];
    console.log(`entered in /api/v1/auth/`);
    if (user) return this.response.redirect(`/dr/dashboard`);

    return this.response.redirect(this.googleService.getAuthUrl());
  }
}
