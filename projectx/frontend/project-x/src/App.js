import React from 'react'
import './App.css'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'

const App = () => {
  const [cookies] = useCookies(['userToken'])

  if (!cookies.userToken) return <Login />

  return (
    <div>
      <BrowserRouter>
      <Navigate to='/dashboard' />
        <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
