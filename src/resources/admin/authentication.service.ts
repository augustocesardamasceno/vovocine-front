import { AccessToken, AdminSessionToken, Credentials, EasyAdmin, UserType } from './admins.resources'
import jwt from 'jwt-decode'

class AuthService {
    baseURL: string = 'http://localhost:8080/v1/admins';
    static AUTH_PARAM: string = "_auth";

    async authenticate(credentials: Credentials) : Promise<AccessToken> {
        const response = await fetch(this.baseURL + "/auth", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(response.status == 401){
            throw new Error("User or password are incorrect!");
        }

        return await response.json();
    }

    async save(admin: EasyAdmin) : Promise<void> {
        const response = await fetch(this.baseURL, {
            method: 'POST',
            body: JSON.stringify(admin),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(response.status == 409){
            const responseError = await response.json();
            throw new Error(responseError.error);
        }
    }

    initSession(token: AccessToken){
        if(token.accessToken){
            const decodedToken: any = jwt(token.accessToken);
            
            const adminSessionToken: AdminSessionToken = {
                accessToken: token.accessToken,
                email: decodedToken.sub,
                name: decodedToken.name,
                expiration: decodedToken.exp,
            }

            this.setAdminSession(adminSessionToken);
        }
    }
    

    setAdminSession(adminSessionToken: AdminSessionToken){
        try{
            localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(adminSessionToken));
        }catch(error){}
    }

    getAdminSession() : AdminSessionToken | null {
        try{
            const authString = localStorage.getItem(AuthService.AUTH_PARAM);
            if(!authString){
                return null;
            }

            const token: AdminSessionToken = JSON.parse(authString);
            return token;
        }catch(error){
            return null;
        }
    }

    isSessionValid() : boolean {
        const adminSession: AdminSessionToken | null = this.getAdminSession();
        if(!adminSession){
            return false;
        }

        const expiration: number | undefined = adminSession.expiration;
        if(expiration){
            const expirationDateInMillis = expiration * 1000;
            return new Date() < new Date(expirationDateInMillis);
        }

        return false;
    }

    invalidateSession(): void {
        try{
            localStorage.removeItem(AuthService.AUTH_PARAM);
        }catch(error){}
    }


}

export const useAuthAdmin = () => new AuthService(); 

