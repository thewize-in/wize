import { User } from './user';
import { AuthProviderProfileInfo } from '../../../shared/services/authProviders/models/authProviderProfileInfo';
import { Result } from '../../../shared/core/logic/Result';
import { Username } from './Username';

let userResult: Result<User>, user: User;

const userGoogleProfile: AuthProviderProfileInfo = {
  username: 'Saud Chougle',
  first_name: 'saud',
  last_name: 'chougle',
  email: 'saudchougle.sc@gmail.com',
  is_email_verified: true,
  profile_pic: 'saud.png',
  google_id: '1234567',
};

beforeAll(() => {
  user = null;
});

test('create user and username', () => {
  userResult = User.create({
    firstName: userGoogleProfile.first_name,
    lastName: userGoogleProfile.last_name,
    username: Username.create(userGoogleProfile.email).getValue(),
    email: userGoogleProfile.email,
    isEmailVerified: userGoogleProfile.is_email_verified,
    profilePic: userGoogleProfile.profile_pic,
    googleId: userGoogleProfile.google_id,
  });
  expect(userResult.isSuccess).toBeTruthy();
  expect(userResult.isFailure).toBeFalsy();
});

test('user role should be doctor', () => {
  user = userResult.getValue();
  expect(user.role).toBe(2);
});

test('new user should raise UserCreated Domain Event', () => {
  expect(user.domainEvents.length).toBe(0);
});
