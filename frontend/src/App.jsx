import React from 'react'
import Userlogin from './pages/Userlogin'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Superadmin from './panel/Superadmin'
import Admin from './pages/Admin'
import Superlogin from './pages/Superlogin'
import Registeradmin from './pages/Registeradmin'
import Userpanel from './panel/Userpanel'

import Adminpanel from './panel/Adminpanel'
import Gym from './pages/Gym'
import UserDashboard from './panel/UserDashboard'
import Userattendance from './pages/Userattendance'

const App = () => {
  return (
<main className='bg-black'>
<Routes>
  <Route path='/' element={<Superadmin/>}/>
<Route path='/login' element ={<Userlogin/>}/>
<Route path='/register' element ={<Register/>}/>
<Route path='/adminlogin' element={<Admin/>}></Route>
<Route path='/superlogin' element= {<Superlogin/>}></Route>
<Route path='/adminpanel' element = {<Adminpanel/>} />
<Route path='/adminregister' element = {<Registeradmin/>}></Route>
<Route  path='/gym'   element ={<Gym/>} />
<Route path = '/userdash' element = { <UserDashboard/>} />
<Route path='/user' element = {<Userpanel/>} />
<Route path='/attend'     element = {<Userattendance/>}            />
</Routes>
{/* <Userlogin/> */}

</main>
  )
}
//  anandraj
export default App
