export default interface JWTPayload {
    sub: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

export interface LoginResponse {
    token: string;
    expiresIn: number;
}
