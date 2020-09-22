import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { authConfig } from '../../../config/authConfig';

passport.use(
  new Strategy(
    {
      clientID: authConfig.googleClientId,
      clientSecret: authConfig.googleClientSecret,
      callbackURL: `/api/v1/auth/oauth2/google/callback`,
    },
    () => {}
  )
);
