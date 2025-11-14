import React from 'react'
import { Route } from 'react-router'
import { RouterProvider } from 'react-router'
import { createBrowserRouter, createRoutesFromElements } from 'react-router'
import Register from './Components/Register'
import Login from './Components/Login'
import app from './Firbase.config'
import Note from './Components/Home'
import Home from './Components/Home'
import Bin from './Components/Bin'

const App = () => {
const myRoute = createBrowserRouter(createRoutesFromElements(
<Route>
<Route path='/' element={<Register/>}/>
<Route path='/Login' element={<Login/>}/>
<Route path='/Home' element={<Home/>}/>
<Route path='/Bin' element={<Bin/>}/>
</Route>  
))

  return (

    <>
    <RouterProvider router={myRoute}/>
    
    </>
  )
}

export default App