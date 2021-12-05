import React from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import UserAccess from './UserAccess'
import NewUserAccess from './NewUserAccess'
import NewFamily from './NewFamily'
import LostPassword from './LostPassword'
import ResetPassword from './ResetPassword'

const Login = () => {

    return (
        <BrowserRouter>
            <div>
                <Link to="/new">Create new Family</Link>
            </div>
            <Routes>
                <Route exact path='/login/:hash' element={<NewUserAccess />} />
                <Route exact path='/reset/:hash' element={<ResetPassword />} />
                <Route path='/new' element={<NewFamily />} />
                <Route path='/lost' element={<LostPassword />} />
                <Route path='/' element={<UserAccess />} />
            </Routes>
            <div>
                <Link to="/lost">Lost Password</Link>
            </div>
        </BrowserRouter>
    )
}

export default Login