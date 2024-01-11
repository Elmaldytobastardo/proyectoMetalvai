import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainAdmin from './pages/admin/mainAdmin'
import ProdAdmin from './pages/admin/ProdAdmin'
import Login from './pages/admin/login'
import { AuthProvider } from './context/AuthProvider'
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'


function App() {


  return (
    <>
 <AuthProvider>
      <Routes>
     
      <Route path='/' element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            
        </Route>

      <Route path='/admin' element={<RutaProtegida />}>
            <Route index element={<MainAdmin />} />
            <Route path='producto' element={<ProdAdmin />} />
            <Route path='ventas' element={<MainAdmin />} />
          </Route>
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
