import React from 'react'
import Userlogin from './pages/Userlogin'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'

const App = () => {
  return (
<main className='bg-black'>
<Routes>
<Route path='/login' element ={<Userlogin/>}/>
<Route path='/register' element ={<Register/>}/>

</Routes>
<Userlogin/>

</main>
  )
}

export default App
