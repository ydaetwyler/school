import React from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import UserAccess from './UserAccess'
import NewUserAccess from './NewUserAccess'
import NewFamily from './NewFamily'

const Login = ({ setToken }) => {

    return (
        <BrowserRouter>
        <div>
            <Link to="/new">Create new Family</Link>
        </div>
            <Routes>
                <Route exact path='/login/:hash' element={<NewUserAccess setToken={setToken} />} />
                <Route path='/new' element={<NewFamily />} />
                <Route path='/' element={<UserAccess setToken={setToken} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Login