require('dotenv').config();
import { AuthProviderProfileInfo } from '../models/authProviderProfileInfo';
import { AuthProvider } from '../models/authProvider';
import { OAuth2Client } from 'google-auth-library';
import { authConfig } from '../../../config/authConfig';
import { GetTokenResponse, GenerateAuthUrlOpts } from 'google-auth-library/build/src/auth/oauth2client';

export interface IGoogleService extends AuthProvider {
    getProfileInfo(token: string): Promise<AuthProviderProfileInfo>;
    checkValidAuthToken(token: string): Promise<boolean | object>;
    getAuthToken(code: string): Promise<any>;
    getAuthUrl(): string;
}
type googleProfieDTO = {
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    sub: string;
};
export class GoogleService implements IGoogleService {
    private client: OAuth2Client;
    constructor() {
        this.client = new OAuth2Client({
            clientId: authConfig.googleClientId,
            clientSecret: authConfig.googleClientSecret,
            redirectUri: authConfig.googleCallbackUrl,
        });
    }
    public getAuthUrl(): string {
        const generateAuthUrlOpts: GenerateAuthUrlOpts = {
            scope: [
                'https://www.googleapis.com/auth/userinfo.email',
                ' https://www.googleapis.com/auth/userinfo.profile',
            ],
            access_type: 'offline',
        };
        return this.client.generateAuthUrl(generateAuthUrlOpts);
    }
    public async getAuthToken(code: string): Promise<any> {
        const { tokens }: GetTokenResponse = await this.client.getToken(code);
        return tokens.id_token;
    }
    public async getProfileInfo(token: string): Promise<AuthProviderProfileInfo> {
        const data: googleProfieDTO = await this.getTicketPaylod(token);
        return {
            username: data.name,
            first_name: data.given_name,
            last_name: data.family_name,
            profile_pic: data.picture,
            email: data.email,
            is_email_verified: data.email_verified,
            google_id: data.sub,
        };
    }
    public async checkValidAuthToken(token: string): Promise<boolean> {
        const payload: any = await this.getTicketPaylod(token);
        if (payload.aud === authConfig.googleClientId) return true;
        return false;
    }
    private async getTicketPaylod(token: string): Promise<any> {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken: token,
                audience: authConfig.googleClientId,
            });
            return ticket.getPayload();
        } catch (err) {
            return false;
        }
    }
}
