import React from 'react'
import { Route } from 'react-router'
import { RouterProvider } from 'react-router'
import { createBrowserRouter, createRoutesFromElements } from 'react-router'
import Register from './Components/Register'
import Login from './Components/Login'
import app from './Firbase.config'

const App = () => {
const myRoute = createBrowserRouter(createRoutesFromElements(
<Route>
<Route path='/' element={<Register/>}/>
<Route path='/Login' element={<Login/>}/>
</Route>  
))

  return (

    <>
    <RouterProvider router={myRoute}/>
    
    </>
  )
}

export default App