import { Role } from './Role';

export interface JWTClaims {
    userId: string;
    role: Role;
}
export type JWTToken = string;

export type SessionId = string;

export type RefreshToken = string;
