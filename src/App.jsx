import React from 'react'
import { Route } from 'react-router'
import { RouterProvider } from 'react-router'
import { createBrowserRouter, createRoutesFromElements } from 'react-router'
import Register from './Components/Register'
import Login from './Components/Login'
import app from './Firbase.config'
import Note from './Components/Note'

const App = () => {
const myRoute = createBrowserRouter(createRoutesFromElements(
<Route>
<Route path='/' element={<Register/>}/>
<Route path='/Login' element={<Login/>}/>
<Route path='/Note' element={<Note/>}/>
</Route>  
))

  return (

    <>
    <RouterProvider router={myRoute}/>
    
    </>
  )
}

export default App