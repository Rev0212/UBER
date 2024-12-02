import React from 'react'
import { Route,Routes} from 'react-router-dom'
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from'./pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSingup'
import UserProtectWrapper from './pages/UserProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import CaptainHome from './pages/CaptainHome'
import UserLogout from './pages/UserLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import Ride from './pages/Ride'
import CaptainRiding from './pages/CaptainRiding'

const App = () =>{
  return(
    <div>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/captain-login' element={<CaptainLogin/>} />
        <Route path='/captain-signup' element={<CaptainSignUp/>} />
        <Route path='/home' element={<UserProtectWrapper><Home/></UserProtectWrapper>}/>
        <Route path='/user-logout' element={<UserLogout/>}/>
        <Route path='/captain-logout' element={<CaptainLogout/>}/>
        <Route path='/user-ride' element={<UserProtectWrapper><Ride/></UserProtectWrapper>}/>
        <Route path='/captain-home' element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper>}/>
        <Route path='/captain-riding' element={<CaptainProtectWrapper><CaptainRiding/></CaptainProtectWrapper>}/>
      </Routes>
    </div>
  )
}


export default App