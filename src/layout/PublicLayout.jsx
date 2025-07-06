
import AuthHandler from '@/handler/authhandler'
import Footer from '../components/footer'
import Header from '../components/header'
import { Outlet } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <div className='w-full'>
      { /*handler to store user data */}
      <AuthHandler/>
      <Header/>
      <Outlet/>
      <Footer/>

    </div>
  )
}
