import React from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import UserAccessForm from '../Forms/UserAccessForm'
import NewUserAccessForm from '../Forms/NewUserAccessForm'
import NewFamilyForm from '../Forms/NewFamilyForm'
import LostPasswordForm from '../Forms/LostPasswordForm'
import ResetPasswordForm from '../Forms/ResetPasswordForm'

const Login = () => {

    return (
        <BrowserRouter>
            <div>
                <Link to="/new">Create new Family</Link>
            </div>
            <Routes>
                <Route exact path='/login/:hash' element={<NewUserAccessForm />} />
                <Route exact path='/reset/:hash' element={<ResetPasswordForm />} />
                <Route path='/new' element={<NewFamilyForm />} />
                <Route path='/lost' element={<LostPasswordForm />} />
                <Route path='/' element={<UserAccessForm />} />
            </Routes>
            <div>
                <Link to="/lost">Lost Password</Link>
            </div>
        </BrowserRouter>
    )
}

export default Login