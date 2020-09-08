import { Request, Response, NextFunction } from 'express';

export class AuthorizationMiddleware {
  private endRequest(status: 400 | 401 | 403, message: string, res: Response) {
    return res.status(status).send({ message });
  }
  public ensureAuthenticated() {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (!req.session || !req.session.user) {
        this.endRequest(401, 'you need to login', res);
      }
      return next();
    };
  }
  public ensureUserIsPatient() {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (req.session && req.session.user['role'] === 1) return next();
      return this.endRequest(403, 'unauthorized request', res);
    };
  }
  public ensureUserIsDoctor() {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (req.session && req.session.user['role'] === 2) return next();
      return this.endRequest(403, 'unauthorized request', res);
    };
  }
  public ensureUserIsAdmin() {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (req.session && req.session.user['role'] === 3) return next();
      return this.endRequest(403, 'unauthorized request', res);
    };
  }
  public ensureUserIsLoggedOut() {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (!req.session || !req.session.user) {
        return next();
      }
      return this.endRequest(401, 'you are logged in', res);
    };
  }
  public isLoggedIn() {
    return async (req: Request, res: Response) => {
      if (!req.session || !req.session.user) {
        return res.status(200).json({ isAuthorize: false });
      }
      return res.status(200).json({ isAuthorize: true });
    };
  }
  public isPatient() {
    return async (req: Request, res: Response) => {
      if (req.session && req.session.user['role'] === 1) {
        return res.status(200).json({ isAuthorize: true });
      }
      return res.status(200).json({ isAthorize: false });
    };
  }
  public isDoctor() {
    return async (req: Request, res: Response) => {
      if (req.session && req.session.user['role'] === 2) {
        return res.status(200).json({ isAuthorize: true });
      }
      return res.status(200).json({ isAuthorize: false });
    };
  }
}
