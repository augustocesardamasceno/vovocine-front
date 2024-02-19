import Login from '@/app/loginUser/page';
import { useAuth } from '@/resources'

interface AuthenticatedPageProps {
    children: React.ReactNode
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({
    children
}) => {

    const userAuth = useAuth();

    if(!userAuth.isSessionValid()){
        return <Login/>
    }


    return (
        <>
            {children}
        </>
    )
}