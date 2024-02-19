export class EasyUser {
    name?: string;
    email?: string;
    password?: string;
}

export class Credentials {
    email?: string;
    password?: string;
}

export class AcessToken {
    accessToken?: string;
}

export class UserSessionToken {
    name?: string;
    email?: string;
    accessToken?: string;
    expiration?: number;
}