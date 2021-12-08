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
            <Routes>
                <Route path='/login/:hash' element={<NewUserAccessForm />} />
                <Route path='/reset/:hash' element={<ResetPasswordForm />} />
                <Route path='/new' element={<NewFamilyForm />} />
                <Route path='/lost' element={<LostPasswordForm />} />
                <Route exact path='/' element={<UserAccessForm />} />
            </Routes>
            <div>
                <Link to="/lost">Lost password</Link>
                <Link to="/new">Create new family</Link>
            </div>
        </BrowserRouter>
    )
}

export default Login