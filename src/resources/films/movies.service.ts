import { EasyMovie } from './movies.resources'
import { useAuth, useAuthAdmin } from '@/resources'

class MovieService {
    baseURL: string = 'http://localhost:8080/v1/movies';
    auth = useAuthAdmin();
    authUser = useAuth();

    async buscar(query: string = "", movieGenre: string = "") : Promise<EasyMovie[]> {
        const adminSession = this.auth.getAdminSession();
        const userSession = this.authUser.getUserSession();
        const url = `${this.baseURL}?query=${query}&movieGenre=${movieGenre}`
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${adminSession?.accessToken || userSession?.accessToken}`
            }
        });
        return await response.json(); 
    }

    async salvar(dados: FormData) : Promise<string> {
        const adminSession = this.auth.getAdminSession();
        const response = await fetch(this.baseURL, {
            method: 'POST',
            body: dados,
            headers: {
                "Authorization": `Bearer ${adminSession?.accessToken}`
            } 
        })

        return response.headers.get('location') ?? ''
    }
}

export const useMovieService = () => new MovieService();