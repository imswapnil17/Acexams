import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './Routes/Home'
import Login from './Routes/Login'
import Dashboard from './Routes/Dashboard'
import CreateTask from './Routes/CreateTask'
import Settings from './Routes/Settings'
import PageNotFound from './Routes/PageNotFound'
function App() {
  return (
   <Routes>

    <Route path='/'  element={<Home/>}/>
    <Route path='/login'  element={<Login/>}/>
    <Route path='/sign-up'  element={<Login/>}/>
    <Route path='/dashboard'  element={<Dashboard/>}/>
    <Route path='/create-task'  element={<CreateTask/>}/>
    <Route path='/settings'  element={<Settings/>}/>
    <Route path='*'  element={<PageNotFound/>}/>

   </Routes>
  )
}

export default App