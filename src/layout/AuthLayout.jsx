
import { Outlet } from 'react-router-dom'
export default function AuthLayout() {
  return (
    <div className='w-screen h-screen overflow-hidden flex items-center justify-center relative'>
    { /*handler to store user data */}
    <img src='/assets/img/bg.png' alt="Background for signin" className=' w-full h-full absolute opacity-60'></img>
    <Outlet/>
  

  </div>
  )
}
