import { AuthProviderProfileInfo } from "./authProviderProfileInfo";

export abstract class AuthProvider {
    abstract getProfileInfo(token: string): Promise<AuthProviderProfileInfo>;
    abstract checkValidAuthToken(token: string): Promise<boolean | object>;
}