import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainAdmin from './pages/admin/mainAdmin'
import ProdAdmin from './pages/admin/ProdAdmin'
import Login from './pages/admin/login'
import { AuthProvider } from './context/AuthProvider'
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'
import VentasAdmin from './pages/admin/VentasAdmin'
import ClienteAdmin from './pages/admin/ClienteAdmin'


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
            <Route path='dashboard'  element={<MainAdmin />} />
            <Route path='producto' element={<ProdAdmin />} />
            <Route path='ventas' element={<VentasAdmin />} />
            <Route path='cliente' element={<ClienteAdmin />} />
          </Route>
      </Routes>
    </AuthProvider>
    </>
  )
}

export default App
