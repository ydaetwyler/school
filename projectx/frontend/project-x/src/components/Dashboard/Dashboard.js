import React from 'react'
import { useCookies } from 'react-cookie'
import Login from '../Login/Login'
import Family from '../Family/Family'
import User from '../User/User'

const Dashboard = () => {
    const [cookies] = useCookies(['userToken'])

    if (!cookies.userToken) return <Login />

    window.history.replaceState(null, "Dashboard", "/")

    return (
        <div>
            <User />
            <Family />
        </div>
    )
}

export default Dashboard