import Login from '@/app/loginAdmin/page';
import { useAuthAdmin } from '@/resources'

interface AuthenticatedPageProps {
    children: React.ReactNode
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({
    children
}) => {

    const adminAuth = useAuthAdmin();

    if(!adminAuth.isSessionValid()){
        return <Login/>
    }


    return (
        <>
            {children}
        </>
    )
}