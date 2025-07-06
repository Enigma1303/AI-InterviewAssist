
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import PublicLayout from './layout/PublicLayout'
import Home from './Pages/Home'
import AuthLayout from './layout/AuthLayout'
import { SignIn } from '@clerk/clerk-react'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import ProtectRoutes from './layout/ProtectedLayout'
import MainLayout from './layout/MainLayout'
import Generate from './components/generate'
import DashBoard from './Pages/DashBoard'
import { CreateInterviewPage } from './Pages/CreateInterviewForm'
import InterviewLoadPage from './Pages/InterviewLoadPage'
import InterviewPage from './Pages/InterviewPage'
import DisplayResults from './Pages/Displayresults'
export default function App() {
  return (
   <Router>
    <Routes>
      <Route element={<PublicLayout/>}>
      <Route index element={<Home/>}></Route>
      </Route>
       {/* Authentication layout*/}
      <Route element={<AuthLayout/>}>
      <Route path="/signin/*" element={<Signin/>}></Route>
      <Route path="/signup/*" element={<Signup/>}></Route>
      </Route>

      {/* Protected Routes*/}
      <Route element=
      {<ProtectRoutes>
        <MainLayout/>
        </ProtectRoutes>}>

      
      <Route element={<Generate/>} path="/generate">
       <Route index element={<DashBoard/>}/>
       <Route path=":interviewID" element={<CreateInterviewPage/>}/>
       <Route path="interview/:interviewId" element={<InterviewLoadPage/>}/>
       <Route path="interview/:interviewId/start" element={<InterviewPage/>}/>
         <Route path="feedback/:interviewId" element={<DisplayResults/>}/>
       </Route>
     
      </Route>
    </Routes>

   
   </Router>
  )
}
