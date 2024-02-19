'use client'

import { useAuth, useAuthAdmin } from '@/resources'
import LoginPage from './loginAdmin/page'
import MoviePage from './galeria/page'

export default function Home() {

  const authAdmin = useAuthAdmin();
  const admin = authAdmin.getAdminSession();

  const authUser = useAuth();
  const user = authUser.getUserSession();

  if(!admin && !user){
    return <LoginPage />
  }

  return (
    <MoviePage />
  )
}