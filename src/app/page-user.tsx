'use client'

import { useAuth} from '@/resources'
import LoginPage from './loginUser/page'
import MoviePage from './galeria-user/page'

export default function Home() {



const authUser = useAuth();
const user = authUser.getUserSession();

if(!user){
    return <LoginPage />
}

return (
    <MoviePage />
)
}