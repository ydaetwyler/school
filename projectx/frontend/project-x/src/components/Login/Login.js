import React from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import UserAccess from './UserAccess'
import NewUserAccess from './NewUserAccess'
import NewFamily from './NewFamily'

const Login = () => {

    return (
        <BrowserRouter>
        <div>
            <Link to="/new">Create new Family</Link>
        </div>
            <Routes>
                <Route exact path='/login/:hash' element={<NewUserAccess />} />
                <Route path='/new' element={<NewFamily />} />
                <Route path='/' element={<UserAccess />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Login