import React from 'react'
import { Route,Routes} from 'react-router-dom'
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from'./pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSingup'

const App = () =>{
  return(
    <div>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/captain-login' element={<CaptainLogin/>} />
        <Route path='/captain-signup' element={<CaptainSignUp/>} />
      </Routes>
    </div>
  )
}


export default App