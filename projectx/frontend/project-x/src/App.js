import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useToken from './components/Login/useToken'

import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login'

const App = () => {

  const { token, setToken } = useToken()

  if (!token) return <Login setToken={setToken} />

  return (
    <div className="wrapper">
      <h1>Project X</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
